import { TRPCError } from '@trpc/server';
import {
  LeaderboardType,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { TasksService } from '@worksheets/services/tasks';
import { assertNever } from '@worksheets/util/errors';
import { jsonStringifyWithBigInt } from '@worksheets/util/objects';
import { daysAgo } from '@worksheets/util/time';
import {
  getLeaderboardFrequencyDate,
  LEADERBOARD_LIMIT,
  LeaderboardFrequency,
} from '@worksheets/util/types';
import pluralize from 'pluralize';

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
  const gameId = game.id;

  if (game.leaderboard) {
    console.info('Saving user score to leaderboard', { gameId, userId, score });
    await db.gameScore.create({
      data: {
        userId,
        gameId,
        score,
      },
    });
  }

  const tasks = new TasksService(db);
  await tasks.trackLeaderboardAction({
    userId,
    gameId: game.id,
    score,
  });

  return {
    message: `You've scored ${score} ${pluralize('point', score)}!`,
  };
};

export const cleanUpOldScores = async (db: PrismaClient) => {
  const thirtyDaysAgo = daysAgo(30);

  // for each game with a leaderboard
  const gamesWithLeaderboards = await db.game.findMany({
    where: {
      leaderboard: {
        notIn: ['NONE'],
      },
    },
  });

  for (const game of gamesWithLeaderboards) {
    // do not delete the best score for each user.
    const topScores = await db.gameScore.findMany({
      distinct: ['userId'], // for each user
      take: 1, // only save the best score.
      where: { gameId: game.id }, // for this game
      orderBy: [{ score: toSortOrder(game.leaderboard) }, { createdAt: 'asc' }],
      select: { id: true },
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

    console.info(`Deleted ${deleted.count} old scores for game ${game.id}`);
  }
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

  const { leaderboard } = await db.game.findUniqueOrThrow({
    where: {
      id: gameId,
    },
    select: {
      leaderboard: true,
    },
  });

  const fn =
    leaderboard === 'LOW' ? minUserPositionQuery : maxUserPositionQuery;
  const result = await fn(db, { gameId, frequency, userId });

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

  if (!game.leaderboard || game.leaderboard === 'NONE') {
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

  const where = {
    gameId,
    createdAt: {
      gte: start,
    },
  } as const;

  const scores = await db.gameScore.findMany({
    where,
    distinct: ['userId'],
    take: LEADERBOARD_LIMIT,
    orderBy: [
      {
        score: toSortOrder(game.leaderboard),
      },
      {
        createdAt: 'asc',
      },
    ],
    include: {
      user: true,
    },
  });

  const total = await db.gameScore.count({
    where,
  });

  const players = scores.map((player, index) => ({
    user: {
      id: player.user.id,
      username: player.user.username,
    },
    score: player.score,
    rank: index + 1,
  }));

  return { players, total };
};

const toSortOrder = (leaderboard: LeaderboardType) => {
  switch (leaderboard) {
    case 'NONE':
      throw new Error("Cannot sort 'NONE' leaderboard");
    case 'LOW':
      return 'asc';
    case 'HIGH':
      return 'desc';
    default:
      throw assertNever(leaderboard);
  }
};

type PositionQueryOptions = {
  gameId: string;
  frequency: LeaderboardFrequency;
  userId: string;
};
// TODO: dedupe w/ the min user position query
const maxUserPositionQuery = async (
  db: PrismaClient,
  { gameId, frequency, userId }: PositionQueryOptions
) => {
  return await db.$queryRaw`
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
};

const minUserPositionQuery = async (
  db: PrismaClient,
  { gameId, frequency, userId }: PositionQueryOptions
) => {
  return await db.$queryRaw`
      WITH best_scores AS (
        SELECT
            "userId",
            MIN("score") AS "bestScore"

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
            ROW_NUMBER() OVER (ORDER BY "bestScore" ASC, "createdAt" ASC) AS "rank"
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
};
