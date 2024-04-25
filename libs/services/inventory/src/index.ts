import { TRPCError } from '@trpc/server';
import {
  CONSUMPTION_RATES,
  isLotteryItems,
  isRandomTokenQuantity,
  ItemId,
  SHARE_RATES,
} from '@worksheets/data/items';
import {
  ItemType,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { assertNever } from '@worksheets/util/errors';
import {
  STARTING_APPLES,
  STARTING_GIFT_BOXES,
  STARTING_SMALL_CHESTS,
  STARTING_SWORDS,
  STARTING_TOKENS,
} from '@worksheets/util/settings';
import { daysFromNow, isExpired } from '@worksheets/util/time';
import {
  ConsumableDecrementOpts,
  DecrementOpts,
  EtCeteraDecrementOpts,
  InventoryItemSchema,
  SharableDecrementOpts,
} from '@worksheets/util/types';
import pluralize from 'pluralize';

import { unactivatable, unconsumable, undecrementable } from './errors';

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

  async items(
    userId: string,
    types?: ItemType[]
  ): Promise<InventoryItemSchema[]> {
    const inventory = await this.#db.inventory.findMany({
      where: {
        userId,
        item: {
          type: types ? { in: types } : undefined,
        },
      },
      select: {
        id: true,
        itemId: true,
        quantity: true,
        expiresAt: true,
        item: {
          select: {
            id: true,
            name: true,
            description: true,
            imageUrl: true,
            type: true,
            sell: true,
          },
        },
      },
      orderBy: {
        itemId: 'asc',
      },
    });

    return inventory
      .filter((i) => i.quantity > 0)
      .map((inv) => {
        return {
          ...inv.item,
          inventoryId: inv.id,
          itemId: inv.item.id as ItemId,
          quantity: inv?.quantity ?? 0,
          expiresAt: inv?.expiresAt?.getTime() ?? null,
          value: inv.item.sell,
        };
      });
  }

  async find(userId: string, itemId: ItemId) {
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

    const inventory = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
      select: {
        quantity: true,
      },
    });

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
      // TODO: support increment many
      this.increment(userId, '1', STARTING_TOKENS),
      this.increment(userId, '2', STARTING_SMALL_CHESTS),
      this.increment(userId, '3', STARTING_GIFT_BOXES),
      this.increment(userId, '1002', STARTING_SWORDS),
      this.increment(userId, '10001', STARTING_APPLES),
    ]);
  }

  async quantity(userId: string, itemId: ItemId) {
    const item = await this.find(userId, itemId);

    if (!item) {
      return 0;
    }

    return item.quantity;
  }

  /**
   * Decrement works safely in transactions, worst case scenario is that the transaction fails and the user's inventory is unchanged.
   */
  async decrement(userId: string, opts: DecrementOpts) {
    if (opts.itemId === '4') {
      throw undecrementable(opts.itemId);
    }
    const instance = await this.#db.inventory.findFirst({
      where: {
        userId: userId,
        itemId: opts.itemId,
      },
      select: {
        id: true,
        quantity: true,
      },
    });

    if (!instance || instance.quantity < opts.quantity) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Insufficient quantity of item.`,
      });
    }

    await this.#db.inventory.update({
      where: {
        id: instance.id,
      },
      data: {
        quantity: {
          decrement: opts.quantity,
        },
      },
    });

    return await this.#decrement(userId, opts);
  }

  /** Some decrement operations have side effects like consumption or sharable items. */
  async #decrement(userId: string, opts: DecrementOpts) {
    switch (opts.itemId) {
      case '1':
        // currency items have no side effects.
        return `${opts.quantity} ${pluralize('token', opts.quantity)} spent.`;
      case '1001':
      case '1002':
      case '1003':
      case '1004':
      case '1005':
        // combat items have no side effects.
        return `${opts.quantity} ${pluralize('weapon', opts.quantity)} used.`;
      case '3':
      case '6':
      case '7':
        return this.#share(userId, opts);
      case '2':
      case '5':
      case '1000':
        return this.#consume(userId, opts);
      case '10001':
      case '10002':
      case '10003':
      case '10004':
      case '10005':
      case '10006':
      case '10007':
      case '10008':
      case '10009':
      case '10010':
      case '10011':
      case '10012':
      case '10013':
      case '10014':
      case '10015':
      case '10016':
      case '10017':
      case '10018':
      case '10019':
        return this.#sell(userId, opts);
      case '4': // must be activated.
        throw unconsumable(opts.itemId);
      default:
        throw assertNever(opts);
    }
  }

  async #sell(userId: string, opts: EtCeteraDecrementOpts) {
    const item = await this.#db.item.findFirst({
      where: {
        id: opts.itemId,
      },
      select: {
        sell: true,
        name: true,
      },
    });

    if (!item) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Item ${opts.itemId} does not exist`,
      });
    }

    const total = item.sell * opts.quantity;

    await this.#increment(userId, '1', total);

    return `Sold ${opts.quantity} ${pluralize(
      item.name,
      opts.quantity
    )} for ${total} tokens.`;
  }

  async #share(userId: string, opts: SharableDecrementOpts) {
    const rate = SHARE_RATES[opts.itemId];
    const giving = rate.friend * opts.quantity;
    const receiving = rate.user * opts.quantity;

    await this.increment(opts.friendId, '1', giving);
    await this.increment(userId, '1', receiving);

    // TODO: notify the friend that someone shared items with them.

    return `You have shared ${giving} ${pluralize(
      'token',
      giving
    )} and received ${receiving} ${pluralize('token', receiving)}`;
  }

  async #consume(userId: string, opts: ConsumableDecrementOpts) {
    const rate = CONSUMPTION_RATES[opts.itemId];
    if (isLotteryItems(rate)) {
      const items: string[] = [];
      for (let i = 0; i < opts.quantity; i++) {
        const item = rate.items[Math.floor(Math.random() * rate.items.length)];
        await this.increment(userId, item.id, 1);
        items.push(item.name);
      }
      const groupedItems = items.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      return `You have found ${Object.entries(groupedItems)
        .map(([item, count]) => `${count} ${pluralize(item, count)}`)
        .join(', ')}`;
    } else if (isRandomTokenQuantity(rate)) {
      // calculate the random quantity of tokens to award.
      let tokens = 0;
      for (let i = 0; i < opts.quantity; i++) {
        tokens += Math.floor(Math.random() * (rate.max - rate.min) + rate.min);
      }
      await this.increment(userId, '1', tokens);
      return `You have earned ${tokens} ${pluralize('tokens', tokens)}`;
    } else {
      throw unconsumable(opts.itemId);
    }
  }

  /** Incrementing is used to add an item to a user's account. Some items do not stack, these items use #award. */
  async increment(userId: string, itemId: ItemId, quantity: number) {
    switch (itemId) {
      case '1':
      case '2':
      case '3':
      case '5':
      case '6':
      case '7':
      case '1000':
      case '1001':
      case '1002':
      case '1003':
      case '1004':
      case '1005':
      case '10001':
      case '10002':
      case '10003':
      case '10004':
      case '10005':
      case '10006':
      case '10007':
      case '10008':
      case '10009':
      case '10010':
      case '10011':
      case '10012':
      case '10013':
      case '10014':
      case '10015':
      case '10016':
      case '10017':
      case '10018':
      case '10019':
        return this.#increment(userId, itemId, quantity);
      case '4':
        return this.#award(userId, itemId, quantity);

      default:
        throw assertNever(itemId);
    }
  }

  async #increment(userId: string, itemId: ItemId, amount: number) {
    const instance = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
    });

    if (!instance) {
      const i = await this.#db.inventory.create({
        data: {
          userId,
          itemId,
          quantity: amount,
        },
      });
      return i.quantity;
    } else {
      const i = await this.#db.inventory.update({
        where: {
          id: instance.id,
        },
        data: {
          quantity: {
            increment: amount,
          },
        },
      });
      return i.quantity;
    }
  }

  /**
   * Awarding is used to safely increment or add items to a users inventory. Items like steam keys cannot stack, awarding takes care of this
   * Creates a new instance of an item that expires after some time.
   */
  async #award(userId: string, itemId: ItemId, quantity: number) {
    const item = await this.#db.item.findFirst({
      where: {
        id: itemId,
      },
      select: {
        expiration: true,
      },
    });

    if (!item) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Item ${itemId} does not exist`,
      });
    }

    for (let i = 0; i < quantity; i++) {
      await this.#db.inventory.create({
        data: {
          userId,
          itemId,
          quantity: 1,
          expiresAt: item.expiration ? daysFromNow(item.expiration) : undefined,
        },
      });
    }
  }

  /**
   * Activate will delete an expirable item from the user's inventory
   * and create an activation code. Use this for items like Steam keys.
   */
  async activate(userId: string, inventoryId: string) {
    const inventory = await this.#db.inventory.findFirst({
      where: {
        userId,
        id: inventoryId,
      },
      select: {
        id: true,
        itemId: true,
        expiresAt: true,
        item: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!inventory) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Item was not found in inventory.`,
      });
    }

    if (isExpired(inventory?.expiresAt)) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Item has expired',
      });
    }

    const itemId = inventory.itemId as ItemId;
    if (itemId !== '4') {
      throw unactivatable(inventory.itemId);
    }

    return this.#activateSteamKey({
      userId,
      inventoryId,
      itemId,
      item: inventory.item,
    });
  }

  async #activateSteamKey({
    userId,
    inventoryId,
    itemId,
    item,
  }: {
    userId: string;
    inventoryId: string;
    itemId: ItemId;
    item: { name: string };
  }) {
    // delete the inventory record.
    await this.#db.inventory.delete({
      where: {
        id: inventoryId,
      },
    });

    // assign an unclaimed steam key to the user
    const code = await this.#db.activationCode.findFirst({
      where: {
        userId: null,
        itemId: itemId,
      },
      select: {
        id: true,
        content: true,
      },
    });

    if (!code) {
      console.error('No unclaimed Steam keys available');
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to claim key. Contact support.',
      });
    }

    await this.#db.activationCode.update({
      where: {
        id: code.id,
      },
      data: {
        userId: userId,
        accessedAt: new Date(),
      },
    });

    return {
      code,
      item,
    };
  }

  /**
   * Damage calculates the total damage dealt by a player based on the items they are using.
   */
  damage(items: { itemId: ItemId; quantity: number }[]) {
    // TODO: compute bonus damage modifiers based on mob resistances or player buffs
    return items.reduce((acc, item) => {
      return acc + this.#damage(item.itemId) * item.quantity;
    }, 0);
  }

  #damage(itemId: ItemId) {
    switch (itemId) {
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '1000':
      case '10001':
      case '10002':
      case '10003':
      case '10004':
      case '10005':
      case '10006':
      case '10007':
      case '10008':
      case '10009':
      case '10010':
      case '10011':
      case '10012':
      case '10013':
      case '10014':
      case '10015':
      case '10016':
      case '10017':
      case '10018':
      case '10019':
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Item ID ${itemId} cannot be used for damage calculation.`,
        });
      case '1':
        return 1;
      case '1001':
      case '1005':
        return 5;
      case '1002':
        return 6;
      case '1003':
        return 7;
      case '1004':
        return 8;
      default:
        throw assertNever(itemId);
    }
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
}
