import { TRPCError } from '@trpc/server';
import {
  CONSUMPTION_RATES,
  isLotteryItems,
  isRandomTokenQuantity,
  Item,
  ItemId,
  SHARE_RATES,
} from '@worksheets/data/items';
import {
  ItemType,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { arrayFromNumber, randomArrayElement } from '@worksheets/util/arrays';
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
  isCapsuleDecrementOpts,
  isCombatDecrementOpts,
  isConsumableDecrementOpts,
  isCurrencyDecrementOpts,
  isEtCeteraDecrementOpts,
  isPrizeWheelDecrementOpts,
  isSharableDecrementOpts,
  isSteamKeyDecrementOpts,
  SharableDecrementOpts,
  SteamKeyDecrementOpts,
} from '@worksheets/util/types';
import pluralize from 'pluralize';

import { unconsumable } from './errors';

export class InventoryService {
  #db: PrismaClient | PrismaTransactionalClient;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async getItem(itemId: string) {
    return await this.#db.item.findUniqueOrThrow({
      where: {
        id: itemId,
      },
    });
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

  async count(userId: string) {
    const count = await this.#db.inventory.count({
      where: {
        userId,
        quantity: {
          gt: 0,
        },
      },
    });
    return count;
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
        expiration: {
          select: {
            expiresAt: true,
          },
        },
        item: {
          select: {
            id: true,
            name: true,
            description: true,
            imageUrl: true,
            type: true,
            sell: true,
            buy: true,
            rarity: true,
          },
        },
      },
      orderBy: {
        itemId: 'asc',
      },
    });

    inventory.sort((a, b) => Number(a.itemId) - Number(b.itemId));

    return inventory
      .map((inv) => {
        const expirations =
          inv.expiration?.map((e) => e.expiresAt.getTime()) ?? [];
        const expiredExpirations = expirations.filter(isExpired);
        const nonExpiredExpirations = expirations
          .filter((e) => !isExpired(e))
          // sort the non-expired expirations so that the soonest expiration is first.
          .sort((a, b) => a - b);
        const quantity = inv.quantity - expiredExpirations.length;
        return {
          ...inv.item,
          inventoryId: inv.id,
          itemId: inv.item.id as ItemId,
          quantity,
          expiration: nonExpiredExpirations,
        };
      })
      .filter((i) => i.quantity > 0);
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
      include: {
        expiration: true,
      },
    });

    const expirations =
      inventory?.expiration?.map((e) => e.expiresAt.getTime()) ?? [];
    const expiredExpirations = expirations.filter(isExpired);
    const quantity = Math.max(
      0,
      (inventory?.quantity ?? 0) - expiredExpirations.length
    );

    return {
      ...item,
      id: inventory?.id,
      itemId: itemId,
      quantity,
      expirations: expirations.filter((e) => !isExpired(e)),
    };
  }

  async findMany() {
    // TODO: does the same as find but it finds multiple items at once.
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
    return item.quantity;
  }

  /**
   * Decrement works safely in transactions, worst case scenario is that the transaction fails and the user's inventory is unchanged.
   */
  async decrement(userId: string, opts: DecrementOpts) {
    const inventory = await this.find(userId, opts.itemId);

    if (!inventory || !inventory.id || inventory.quantity < opts.quantity) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `You do not have enough items to perform this action.`,
      });
    }

    if (opts.quantity < 0) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to process request. Invalid quantity ${opts.quantity}.`,
      });
    }

    const update = await this.#db.inventory.update({
      where: {
        id: inventory.id,
      },
      data: {
        quantity: {
          decrement: opts.quantity,
        },
      },
    });

    if (update.quantity < 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `You do not have enough items to perform this action.`,
      });
    }

    return await this.#decrement(userId, inventory.id, opts);
  }

  /** Some decrement operations have side effects like consumption or sharable items. */
  async #decrement(userId: string, inventoryId: string, opts: DecrementOpts) {
    if (isCurrencyDecrementOpts(opts)) {
      return `${opts.quantity} ${pluralize('token', opts.quantity)} spent.`;
    }

    if (isCombatDecrementOpts(opts)) {
      return `${opts.quantity} ${pluralize('weapon', opts.quantity)} used.`;
    }

    if (isSharableDecrementOpts(opts)) {
      return await this.#share(userId, opts);
    }

    if (isConsumableDecrementOpts(opts)) {
      return await this.#consume(userId, opts);
    }

    if (isSteamKeyDecrementOpts(opts)) {
      if (opts.quantity > 1) {
        throw new TRPCError({
          code: 'NOT_IMPLEMENTED',
          message: 'Claiming multiple Steam keys at once is not supported.',
        });
      }
      return await this.#activate(userId, inventoryId, opts);
    }

    if (isEtCeteraDecrementOpts(opts)) {
      return await this.#sell(userId, opts);
    }

    if (isCapsuleDecrementOpts(opts)) {
      console.error(
        'Capsules should only be managed using the capsule service.'
      );
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Capsules are not decrementable.',
      });
    }

    if (isPrizeWheelDecrementOpts(opts)) {
      console.error(
        `Prize wheels should only be managed using the prize wheel service.`
      );
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Prize wheels are not decrementable.',
      });
    }

    throw assertNever(opts);
  }

  async #sell(userId: string, opts: EtCeteraDecrementOpts) {
    const item = await this.#db.item.findUniqueOrThrow({
      where: {
        id: opts.itemId,
      },
      select: {
        sell: true,
        name: true,
      },
    });

    const total = item.sell * opts.quantity;

    await this.increment(userId, '1', total);

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
    console.info('Consuming', { userId, ...opts });

    const rate = CONSUMPTION_RATES[opts.itemId];
    if (isLotteryItems(rate)) {
      const items: Item[] = [];
      for (let i = 0; i < opts.quantity; i++) {
        const item = rate.items[Math.floor(Math.random() * rate.items.length)];
        items.push(item);
      }

      const groupItems = items.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
      }, {} as Record<ItemId, number>);

      console.info('Consuming groups', {
        numItems: items.length,
        numGroups: Object.keys(groupItems).length,
      });

      for (const [itemId, quantity] of Object.entries(groupItems)) {
        await this.increment(userId, itemId as ItemId, quantity);
      }

      return `You have found ${this.#printItemNames(items)}`;
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

  #printItemNames(items: Item[]): string {
    const groupedItems = items.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(groupedItems)
      .map(([item, count]) => `${count} ${pluralize(item, count)}`)
      .join(', ');
  }

  /** Incrementing is used to add an item to a user's account. */
  async increment(userId: string, itemId: ItemId, quantity: number) {
    const inventory = await this.#db.inventory.upsert({
      where: {
        itemId_userId: {
          userId,
          itemId,
        },
      },
      create: {
        userId,
        itemId,
        quantity,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      include: {
        item: true,
      },
    });

    if (inventory.item.expiration) {
      await this.#db.inventoryExpiration.createMany({
        data: arrayFromNumber(quantity).map(() => ({
          inventoryId: inventory.id,
          // item.expiration is defined here because we checked it above.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          expiresAt: daysFromNow(inventory.item.expiration!),
        })),
      });
    }

    return inventory;
  }

  /**
   * Activate will delete an expirable item from the user's inventory
   * and create an activation code. Use this for items like Steam keys.
   */
  async #activate(
    userId: string,
    inventoryId: string,
    opts: SteamKeyDecrementOpts
  ) {
    // assign an unclaimed steam key to the user
    const codes = await this.#db.activationCode.findMany({
      where: {
        userId: null,
        // This is required to prevent users from claiming a key that's currently for sale at prize wall
        itemId: opts.itemId,
      },
      select: {
        id: true,
        content: true,
        name: true,
      },
    });

    if (!codes.length) {
      console.error('No unclaimed Steam keys available');
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to claim key. Contact support.',
      });
    }

    // pick a random available code.
    const code = randomArrayElement(codes);
    await this.#db.activationCode.update({
      where: {
        id: code.id,
      },
      data: {
        userId: userId,
      },
    });

    // find the latest expiration date for the item
    const expiration = await this.#db.inventoryExpiration.findFirst({
      where: {
        inventoryId,
        expiresAt: {
          not: {
            // do not include expired inventory notices.
            lte: new Date(),
          },
        },
      },
      orderBy: {
        expiresAt: 'desc',
      },
    });

    if (expiration) {
      await this.#db.inventoryExpiration.delete({
        where: {
          id: expiration.id,
        },
      });
    }

    return `You have unlocked a ${code.name}!`;
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
