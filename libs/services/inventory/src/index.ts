import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { PrizeId } from '@worksheets/data/prizes';
import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { assertNever } from '@worksheets/util/errors';
import {
  MAX_DAILY_GIFT_BOX_SHARES,
  STARTING_GIFT_BOXES,
  STARTING_TOKENS,
} from '@worksheets/util/settings';

export type AddOptions = {
  userId: string;
  prizeId: string;
};

export type ProcessLootOptions = {
  userId: string;
  prizeId: PrizeId;
};

export type IncrementOptions = {
  userId: string;
  amount: number;
};

export type FindItemsOptions = {
  userId: string;
  itemIds: ItemId[];
};

export class InventoryService {
  #db: PrismaClient | PrismaTransactionalClient;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async globalTokenCount() {
    const tokens = await this.#db.inventory.aggregate({
      where: {
        itemId: '1',
      },
      _sum: {
        quantity: true,
      },
    });
    return tokens._sum.quantity ?? 0;
  }

  async find(userId: string, itemId: ItemId) {
    const inventory = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
      select: {
        quantity: true,
      },
    });

    const item = await this.#db.item.findFirst({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Item ${itemId} does not exist`,
      });
    }

    return {
      itemId: itemId,
      quantity: inventory?.quantity ?? 0,
      name: item.name,
      description: item.description,
      imageUrl: item.imageUrl,
    };
  }

  async initializeUser(userId: string) {
    await Promise.all([
      this.increment(userId, '1', STARTING_TOKENS),
      this.increment(userId, '2', STARTING_GIFT_BOXES),
      this.increment(userId, '3', MAX_DAILY_GIFT_BOX_SHARES),
    ]);
  }

  async quantity(userId: string, itemId: ItemId) {
    const item = await this.find(userId, itemId);

    if (!item) {
      return 0;
    }

    return item.quantity;
  }

  async decrement(userId: string, itemId: ItemId, amount: number) {
    const item = await this.find(userId, itemId);
    if (!item) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot reduce item. ${itemId} does not exist for user ${userId}`,
      });
    }

    if (item.quantity < amount) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Cannot reduce item. ${itemId} does not have enough quantity for user ${userId}`,
      });
    }

    const update = await this.#db.inventory.update({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
      data: {
        quantity: {
          decrement: amount,
        },
      },
    });

    return update.quantity;
  }

  async increment(userId: string, itemId: ItemId, amount: number) {
    const update = await this.#db.inventory.upsert({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
      create: {
        itemId,
        userId,
        quantity: amount,
      },
      update: {
        quantity: {
          increment: amount,
        },
      },
    });

    return update.quantity;
  }

  async resetAll(itemId: ItemId, amount: number) {
    await this.#db.inventory.updateMany({
      where: {
        itemId,
      },
      data: {
        quantity: amount,
      },
    });
  }

  async collect(opts: AddOptions) {
    // find the prize in the database
    const prize = await this.#db.prize.findFirst({
      where: {
        id: opts.prizeId,
      },
      select: {
        type: true,
        id: true,
      },
    });

    if (!prize) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Prize does not exist',
      });
    }

    switch (prize.type) {
      case 'LOOT':
        return await this.#processLoot({
          userId: opts.userId,
          prizeId: prize.id as PrizeId,
        });
      case 'STEAM_KEY':
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Inventory service cannot manage ${prize.type} prizes`,
        });
      default:
        throw assertNever(prize.type);
    }
  }

  async #processLoot(opts: ProcessLootOptions) {
    switch (opts.prizeId) {
      case '1000-tokens':
        await this.increment(opts.userId, '1', 1000);
        break;
      default:
        throw assertNever(opts.prizeId);
    }
  }
}
