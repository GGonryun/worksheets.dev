import { TRPCError } from '@trpc/server';
import {
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
  PrizeStatus,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { shuffle } from '@worksheets/util/arrays';
import { randomFloatBetween } from '@worksheets/util/numbers';
import { calculatePrizePrice, UserSchema } from '@worksheets/util/types';

export class PrizeService {
  private db: PrismaClient | PrismaTransactionalClient;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.db = db;
  }

  async getActive() {
    const prizes = await this.db.prize.findMany({
      where: {
        status: {
          equals: PrizeStatus.ACTIVE,
        },
        code: {
          userId: null,
        },
        purchasedAt: null,
        userId: null,
      },
      include: {
        code: true,
      },
    });

    return prizes.map(cleanse);
  }

  async getHistory() {
    const prizes = await this.db.prize.findMany({
      where: {
        purchasedAt: {
          not: null,
        },
        status: {
          equals: PrizeStatus.REDEEMED,
        },
      },
      orderBy: {
        purchasedAt: 'desc',
      },
      include: {
        code: true,
        user: true,
      },
      take: 20,
    });

    return prizes
      .filter((p) => !!p.userId && !!p.purchasedAt)
      .map((p) => ({
        ...cleanse(p),
        user: p.user ?? { id: '', username: '' },
        purchasedAt: p.purchasedAt?.getTime() ?? 0,
      }));
  }

  async unlock(prizeId: number, user: UserSchema) {
    const inventory = new InventoryService(this.db);

    const prize = await this.db.prize.findUnique({
      where: {
        id: prizeId,
      },
      include: {
        code: true,
      },
    });

    if (prize === null) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Prize not found',
      });
    }

    if (prize.status !== PrizeStatus.ACTIVE) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Prize is not active',
      });
    }

    if (prize.purchasedAt !== null) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Prize has already been purchased',
      });
    }

    if (prize.code.userId !== null) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: "Prize's activation code has already been used",
      });
    }

    const cost = calculatePrizePrice(prize);

    await inventory.decrement(user.id, {
      itemId: '1',
      quantity: cost,
    });

    await this.db.activationCode.update({
      where: {
        id: prize.code.id,
      },
      data: {
        userId: user.id,
        accessedAt: new Date(),
      },
    });

    await this.db.prize.update({
      where: {
        id: prize.id,
      },
      data: {
        purchasedAt: new Date(),
        userId: user.id,
        status: PrizeStatus.REDEEMED,
      },
    });

    return {
      prizeId: prize.id,
      name: prize.code.name,
      code: prize.code.content,
      type: prize.code.type,
      url: prize.code.sourceUrl,
      userId: user.id,
      cost,
    };
  }

  async shuffle() {
    const MAX_DAILY_PRIZES = 5;

    const prizes = await this.db.prize.findMany({
      where: {
        status: {
          in: [PrizeStatus.ACTIVE, PrizeStatus.PENDING],
        },
        code: {
          userId: null,
        },
        purchasedAt: null,
        userId: null,
      },
      include: {
        code: true,
      },
    });

    const shuffled = shuffle(prizes);

    const selected = shuffled.slice(0, MAX_DAILY_PRIZES);
    const unselected = shuffled.slice(MAX_DAILY_PRIZES);

    for (const prize of selected) {
      await this.db.prize.update({
        where: {
          id: prize.id,
        },
        data: {
          discount: randomFloatBetween(0.01, 0.5),
          status: PrizeStatus.ACTIVE,
        },
      });
    }

    for (const prize of unselected) {
      await this.db.prize.update({
        where: {
          id: prize.id,
        },
        data: {
          status: PrizeStatus.PENDING,
          discount: 0,
        },
      });
    }
  }
}

const cleanse = (
  p: Prisma.PrizeGetPayload<{
    include: {
      code: true;
    };
  }>
) => {
  if (!p.code) {
    throw new Error('Prize does not have a code');
  }
  return {
    id: p.id,
    name: p.code.name,
    url: p.code.sourceUrl,
    imageUrl: p.code.imageUrl,
    value: p.value,
    discount: p.discount,
    type: p.code.type,
  };
};
