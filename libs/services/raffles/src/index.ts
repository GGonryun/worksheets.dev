import { TRPCError } from '@trpc/server';
import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { randomArrayElement } from '@worksheets/util/arrays';
import { assertNever } from '@worksheets/util/errors';
import { BASE_EXPIRATION_TIME } from '@worksheets/util/settings';
import { daysFromNow } from '@worksheets/util/time';

import { ExpiredRaffle } from './types';
import { BasicUserInfo, pickWinners, Winner } from './util/winners';

export * from './types';

export class RafflesService {
  #db: PrismaClient | PrismaTransactionalClient;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async addEntries({
    userId,
    raffleId,
    entries,
  }: {
    userId: string;
    raffleId: number;
    entries: number;
  }) {
    const raffle = await this.#db.raffle.findFirst({
      where: {
        id: raffleId,
      },
    });

    if (!raffle) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Raffle does not exist',
      });
    }

    if (raffle.status !== 'ACTIVE' && raffle.publishAt > new Date()) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Raffle is not active or has not been published yet',
      });
    }

    if (raffle.expiresAt < new Date()) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Raffle has expired',
        cause: `Raffle ${raffleId} has expired at ${
          raffle.expiresAt
        } and is now ${new Date()}`,
      });
    }

    if (entries < 1) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid number of entries',
      });
    }

    await this.#db.raffleParticipation.upsert({
      where: {
        userId_raffleId: {
          userId,
          raffleId,
        },
      },
      create: {
        userId,
        raffleId,
        numEntries: entries,
      },
      update: {
        numEntries: {
          increment: entries,
        },
      },
    });
  }

  async processExpiredRaffle(raffle: ExpiredRaffle) {
    // shadow-ban users with multiplier < 0.5
    const participants = raffle.participants.filter(
      (p) => p.user.multiplier > 0.5
    );

    console.info(
      `All participants ${raffle.participants.length}, viable participants ${participants.length}`
    );

    if (participants.length === 0) {
      console.info('No participants in raffle', raffle.id);
      await this.#db.raffle.update({
        where: {
          id: raffle.id,
        },
        data: {
          status: 'COMPLETE',
        },
      });
      return {
        raffle,
        losers: [],
        winners: [],
      };
    }

    if (!participants.every((p) => p.numEntries >= 0)) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'Invalid raffle state. Participant found with negative entries.',
      });
    }

    await this.#db.raffle.update({
      where: {
        id: raffle.id,
      },
      data: {
        status: 'COMPLETE',
      },
    });

    const winners = pickWinners(1, participants);

    console.info('Winners:', winners.map((w) => w.user.email).join(', '));

    for (const winner of winners) {
      await this.#db.raffleParticipation.update({
        where: {
          id: winner.participationId,
        },
        data: {
          winner: true,
        },
      });

      await this.awardPrize({ ...raffle, winner });
    }

    const losers = participants.filter(
      (p) => !winners.some((w) => w.participationId === p.id)
    );

    return {
      raffle,
      losers,
      winners,
    };
  }

  private async awardPrize(opts: {
    winner: Winner;
    prize: ExpiredRaffle['prize'];
  }) {
    switch (opts.prize.type) {
      case 'RANDOM_STEAM_KEY':
        return this.awardRandomSteamKey({
          prize: opts.prize,
          user: opts.winner.user,
        });
      case 'STEAM_KEY':
        return this.awardSteamKey({
          prize: opts.prize,
          user: opts.winner.user,
        });
      default:
        throw assertNever(opts.prize.type);
    }
  }

  private async awardRandomSteamKey(opts: {
    prize: ExpiredRaffle['prize'];
    user: BasicUserInfo;
  }) {
    const codes = await this.#db.activationCode.findMany({
      where: {
        // This is required to prevent users from claiming a key that's already assigned to a prize or another user
        userId: null,
        prize: null,
      },
      select: {
        id: true,
      },
    });

    if (!codes.length) {
      console.error('No unclaimed Steam keys available');
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'No unclaimed Steam keys available',
      });
    }

    // select a random code and assign it to the user.
    const code = randomArrayElement(codes);
    await this.#db.activationCode.update({
      where: {
        id: code.id,
      },
      data: {
        userId: opts.user.id,
      },
    });
    // assign the code to the prize and user for tracking purposes.
    await this.#db.prize.update({
      where: {
        id: opts.prize.id,
      },
      data: {
        codeId: code.id,
        userId: opts.user.id,
      },
    });
    // create an expiration date for the code
    await this.#db.expiration.create({
      data: {
        activationCodeId: code.id,
        expiresAt: daysFromNow(BASE_EXPIRATION_TIME),
      },
    });
  }

  private async awardSteamKey(opts: {
    prize: ExpiredRaffle['prize'];
    user: BasicUserInfo;
  }) {
    if (!opts.prize.codeId) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Prize ${opts.prize.id} does not have a code`,
      });
    }

    const code = await this.#db.activationCode.findUnique({
      where: {
        id: opts.prize.codeId,
      },
    });

    if (!code) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Code ${opts.prize.codeId} does not exist`,
      });
    }

    if (code.userId) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Code ${code.id} is already assigned to a user`,
      });
    }

    await this.#db.activationCode.update({
      where: {
        id: code.id,
      },
      data: {
        userId: opts.user.id,
      },
    });
    // assign the code to the prize and user for tracking purposes.
    await this.#db.prize.update({
      where: {
        id: opts.prize.id,
      },
      data: {
        codeId: code.id,
        userId: opts.user.id,
      },
    });
    // create an expiration date for the code
    await this.#db.expiration.create({
      data: {
        activationCodeId: code.id,
        expiresAt: daysFromNow(BASE_EXPIRATION_TIME),
      },
    });
  }
}
