import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { shuffle } from '@worksheets/util/arrays';

import { EXPIRED_RAFFLE_PROPS, ExpiredRaffle } from './types';

export class RafflesService {
  #db: PrismaClient | PrismaTransactionalClient;
  #inventory: InventoryService;
  #notifications: NotificationsService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#inventory = new InventoryService(db);
    this.#notifications = new NotificationsService(db);
  }

  async publishAll() {
    const raffles = await this.#db.raffle.findMany({
      where: {
        publishAt: {
          lte: new Date(),
        },
        status: 'PENDING',
      },
      select: {
        id: true,
        numWinners: true,
        expiresAt: true,
        premium: true,
        item: {
          select: {
            id: true,
            name: true,
            expiration: true,
          },
        },
        sponsor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (raffles.length === 0) {
      console.info('No raffles to publish');
      return;
    }

    console.info(`Publishing ${raffles.length} raffles`);
    await this.#db.raffle.updateMany({
      where: {
        id: {
          in: raffles.map((r) => r.id),
        },
      },
      data: {
        status: 'ACTIVE',
      },
    });

    for (const raffle of raffles) {
      await this.#notifications.send('new-raffle', raffle);
    }
    console.info(`Published ${raffles.length} raffles`);
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
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'No participants in raffle',
      });
    }

    const winners = await this.#pickWinners(
      raffle.numWinners,
      // the same user could win more than once.
      raffle.participants
    );

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
    await this.#notifications.send('raffle-expired', raffle);
  }

  async #pickWinners(numWinners: number, participants: RaffleEntry[]) {
    // create an in memory array of entries representing each participant
    const entries: RaffleEntry[] = participants.flatMap((participant) =>
      Array(participant.numEntries).fill(participant)
    );

    console.info('Picking winners from', entries.length, 'entries');

    // shuffle the entries and pick the winners
    const shuffled = shuffle(entries);

    // return the winners
    return shuffled.slice(0, numWinners).map((participant) => ({
      user: participant.user,
      participationId: participant.id,
    }));
  }
}

type RaffleEntry = {
  user: {
    id: string;
    email: string;
  };
  id: number;
  numEntries: number;
};
