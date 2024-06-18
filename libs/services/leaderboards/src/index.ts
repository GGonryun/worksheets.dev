import { TRPCError } from '@trpc/server';
import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { jsonStringifyWithBigInt } from '@worksheets/util/objects';
import {
  retryTransaction,
  whenWriteConflictOrDeadlock,
} from '@worksheets/util/prisma';
import { daysAgo } from '@worksheets/util/time';
import {
  getLeaderboardFrequencyDate,
  LEADERBOARD_LIMIT,
  LEADERBOARD_REWARD_PAYOUT,
  LeaderboardFrequency,
} from '@worksheets/util/types';
import pluralize from 'pluralize';

import { getPayoutDates } from './util';

export const submitScore = async (
  db: PrismaTransactionalClient | PrismaClient,
  payload: {
    sessionId: string;
    userId: string;
    score: number;
  }
) => {
  const { sessionId, userId, score } = payload;
  const session = await db.gameSession.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Session not found',
    });
  }

  if (session.userId !== userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User does not own this session',
    });
  }

  const game = await db.game.findUnique({
    where: {
      id: session.gameId,
    },
  });

  if (!game) {
    throw new Error('Game not found');
  }

  await db.gameScore.create({
    data: {
      userId: userId,
      gameId: game.id,
      score,
    },
  });

  const tokens = Math.floor(score * game.multiplier);

  return {
    tokens,
    message: `You've scored ${score} points and won ${tokens} ${pluralize(
      'token'
    )}`,
  };
};

export const rewardTopPlayers = async (
  db: PrismaClient,
  frequency: LeaderboardFrequency
) => {
  const leaderboards = await db.game.findMany({
    where: {
      leaderboard: true,
    },
  });

  const payouts = LEADERBOARD_REWARD_PAYOUT[frequency];

  if (!payouts.length) {
    console.warn(`No rewards for this leaderboard frequency`, { frequency });
    return;
  }

  const { starting, ending } = getPayoutDates(frequency);

  console.log(`Calculating leaderboard rewards`, {
    frequency,
    starting,
    ending,
    payouts,
  });

  for (const leaderboard of leaderboards) {
    const scores = await db.gameScore.findMany({
      where: {
        gameId: leaderboard.id,
        createdAt: {
          // because we are running this cron job at 00:00, we can't use the current date we need to use the previous day
          gte: starting,
          lt: ending,
        },
      },
      distinct: ['userId'],
      orderBy: [
        {
          score: 'desc',
        },
        {
          createdAt: 'asc',
        },
      ],
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      take: payouts.length,
    });

    if (scores.length === 0) {
      console.warn(`No scores for game ${leaderboard.id}`);
      continue;
    }

    console.log(
      `Paying out ${scores.length} users for game ${leaderboard.id}`,
      scores
    );

    const winners = scores.map((score, index) => ({
      payout: payouts[index],
      score,
      rank: index + 1,
    }));

    for (const { score, payout, rank } of winners) {
      await retryTransaction(
        db,
        async (tx) => {
          const inventory = new InventoryService(tx);
          const notifications = new NotificationsService(tx);
          await inventory.increment(score.userId, '1', payout);
          await notifications.send('won-leaderboard', {
            frequency,
            rank,
            score: score.score,
            payout,
            game: {
              id: leaderboard.id,
              title: leaderboard.title,
            },
            user: {
              id: score.user.id,
              username: score.user.username,
            },
          });
        },
        whenWriteConflictOrDeadlock
      );
    }
  }
};

export const cleanUpOldScores = async (db: PrismaClient) => {
  // find scores older than 30 days.
  const thirtyDaysAgo = daysAgo(30);
  // do not delete the best score for each user.
  const topScores = await db.gameScore.findMany({
    distinct: ['userId'],
    orderBy: [
      {
        score: 'desc',
      },
      {
        createdAt: 'asc',
      },
    ],
    select: {
      id: true,
    },
  });

  const deleted = await db.gameScore.deleteMany({
    where: {
      createdAt: {
        lt: thirtyDaysAgo,
      },
      NOT: {
        id: {
          in: topScores.map((score) => score.id),
        },
      },
    },
  });

  console.log(`Deleted ${deleted.count} old scores`);
};

export const getParticipantRank = async (
  db: PrismaClient,
  opts: {
    gameId: string;
    frequency: LeaderboardFrequency;
    userId: string;
    username: string;
  }
) => {
  const { gameId, frequency, userId, username } = opts;

  console.info(`Searching for user score in leaderboard`, {
    gameId,
    frequency,
    userId,
  });

  // find the user's rank in the leaderboard

  const result = await db.$queryRaw`
      WITH best_scores AS (
        SELECT
            "userId",
            MAX("score") AS "bestScore"

        FROM
            "GameScore"
        WHERE
            "gameId" = ${gameId}
            AND "createdAt" >= ${getLeaderboardFrequencyDate(frequency)}
        GROUP BY
            "userId"
        ),
        best_scores_with_time AS (
          SELECT
            bs."userId",
            bs."bestScore",
            ur."createdAt"
          FROM
            best_scores bs
            JOIN "GameScore" ur ON bs."userId" = ur."userId" AND bs."bestScore" = ur."score"
          WHERE
            ur."createdAt" = (
              SELECT MIN("createdAt")
              FROM "GameScore"
              WHERE "userId" = bs."userId" AND "score" = bs."bestScore"
            )
        ),
        ranked_scores AS (
          SELECT
            "userId",
            "bestScore",
            "createdAt",
            ROW_NUMBER() OVER (ORDER BY "bestScore" DESC, "createdAt" ASC) AS "rank"
          FROM
          best_scores_with_time
        )
        SELECT
            "userId",
            "bestScore",
            "rank"
        FROM
          ranked_scores
        WHERE 
          "userId" = ${userId}
      `;

  console.info(
    `Queried user score and rank relative to leaderboard`,
    jsonStringifyWithBigInt(result)
  );

  const parsed = parseResults(result);

  if (parsed.length === 0) {
    return null;
  }

  const p = parsed[0];

  return {
    user: {
      id: userId,
      username,
    },
    score: p.bestScore,
    rank: p.rank,
  };
};

const parseResults = (
  results: unknown
): { bestScore: number; rank: number }[] => {
  if (typeof results != 'object' || !Array.isArray(results)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Invalid results',
    });
  }

  return results.map((result: unknown) => {
    if (
      !result ||
      typeof result != 'object' ||
      Array.isArray(result) ||
      !('bestScore' in result) ||
      !('rank' in result)
    ) {
      throw new TRPCError({
        code: 'PARSE_ERROR',
        message: 'Invalid result',
        cause: result,
      });
    }
    return {
      bestScore: Number(result.bestScore),
      rank: Number(result.rank),
    };
  });
};

export const find = async (
  db: PrismaClient,
  opts: {
    gameId: string;
    frequency: LeaderboardFrequency;
  }
) => {
  const { gameId, frequency } = opts;

  const game = await db.game.findFirst({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Game not found',
      cause: `GameId ${gameId} not found in database`,
    });
  }

  if (!game.leaderboard) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Leaderboards are not enabled',
      cause: `Leaderboard not enabled for game ${gameId}`,
    });
  }
  const start = getLeaderboardFrequencyDate(frequency);
  console.info(
    `Finding leaderboard for game ${gameId} and frequency ${frequency}`,
    { start }
  );
  const scores = await db.gameScore.findMany({
    where: {
      gameId,
      createdAt: {
        gte: start,
      },
    },
    distinct: ['userId'],
    take: LEADERBOARD_LIMIT,
    orderBy: [
      {
        score: 'desc',
      },
      {
        createdAt: 'asc',
      },
    ],
    include: {
      user: true,
    },
  });

  const players = scores.map((player, index) => ({
    user: {
      id: player.user.id,
      username: player.user.username,
    },
    score: player.score,
    rank: index + 1,
  }));

  return { players };
};
