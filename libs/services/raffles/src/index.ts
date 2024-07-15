import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';

import { EXPIRED_RAFFLE_PROPS, ExpiredRaffle } from './types';
import { pickWinners } from './util/winners';

export class RafflesService {
  #db: PrismaClient | PrismaTransactionalClient;
  #inventory: InventoryService;
  #notifications: NotificationsService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#inventory = new InventoryService(db);
    this.#notifications = new NotificationsService(db);
  }

  async addEntries({
    userId,
    raffleId,
    entries,
    bonus,
  }: {
    userId: string;
    raffleId: number;
    entries: number;
    bonus: boolean;
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

    const purchased = bonus ? 0 : entries;

    const update = await this.#db.raffleParticipation.upsert({
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
        purchased,
      },
      update: {
        numEntries: {
          increment: entries,
        },
        purchased: {
          increment: purchased,
        },
      },
    });

    if (!bonus) {
      await this.#inventory.decrement(userId, {
        itemId: '1',
        // TODO: customizable entry fee.
        quantity: RAFFLE_ENTRY_FEE * entries,
      });

      if (raffle.maxEntries != null && update.purchased > raffle.maxEntries) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You cannot exceed the maximum number of entries',
          cause: `User ${userId} has already purchased ${update.purchased} entries for this raffle where the max is ${raffle.maxEntries}.`,
        });
      }
    }
  }

  async processExpiredRaffles() {
    const expiredRaffles = await this.#db.raffle.findMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
        status: 'ACTIVE',
      },
      select: EXPIRED_RAFFLE_PROPS,
    });

    console.info(`Found ${expiredRaffles.length} expired raffles.`);
    for (const expired of expiredRaffles) {
      await this.#processExpiredRaffle(expired);
    }
    console.info(
      `Finished processing ${expiredRaffles.length} expired raffles.`
    );
  }

  async #processExpiredRaffle(raffle: ExpiredRaffle) {
    try {
      await this.#assignWinners(raffle);
    } catch (error) {
      console.error(`Failed to process raffle ${raffle.id}`, error);
    }
  }

  async #assignWinners(raffle: ExpiredRaffle) {
    if (raffle.participants.length === 0) {
      console.info('No participants in raffle', raffle.id);
      await this.#db.raffle.update({
        where: {
          id: raffle.id,
        },
        data: {
          status: 'COMPLETE',
        },
      });
      return;
    }

    if (!raffle.participants.every((p) => p.numEntries >= 0)) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'Invalid raffle state. Participant found with negative entries.',
      });
    }

    const winners = pickWinners(raffle.numWinners, raffle.participants);

    console.info(
      'Winners:',
      winners.map((w) => w.user.email).join(', '),
      raffle
    );

    for (const winner of winners) {
      await this.#db.raffleParticipation.update({
        where: {
          id: winner.participationId,
        },
        data: {
          winner: true,
        },
      });

      await this.#inventory.increment(
        winner.user.id,
        raffle.item.id as ItemId,
        1
      );
      await this.#notifications.send('won-raffle', {
        user: winner.user,
        item: raffle.item,
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

    // notify losers
    await this.#notifications.send('lost-raffle', {
      ...raffle,
      // do not notify winners
      participants: raffle.participants.filter(
        (p) => !winners.some((w) => w.participationId === p.id)
      ),
    });
    await this.#notifications.send('raffle-expired', {
      ...raffle,
      name: raffle.name ?? raffle.item.name,
    });
  }
}
