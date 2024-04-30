import { TRPCError } from '@trpc/server';
import {
  COMBAT_ITEM_DAMAGE,
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
  isCombatDecrementOpts,
  isCombatItemId,
  isConsumableDecrementOpts,
  isCurrencyDecrementOpts,
  isCurrencyItemId,
  isEtCeteraDecrementOpts,
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
          },
        },
      },
      orderBy: {
        itemId: 'asc',
      },
    });

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
          value: inv.item.sell,
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
      select: {
        id: true,
        quantity: true,
        expiration: {
          select: {
            expiresAt: true,
          },
        },
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
      id: inventory?.id,
      itemId: itemId,
      quantity,
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

    await this.#db.inventory.update({
      where: {
        id: inventory.id,
      },
      data: {
        quantity: {
          decrement: opts.quantity,
        },
      },
    });

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
      return this.#share(userId, opts);
    }

    if (isConsumableDecrementOpts(opts)) {
      return this.#consume(userId, opts);
    }

    if (isSteamKeyDecrementOpts(opts)) {
      if (opts.quantity > 1) {
        throw new TRPCError({
          code: 'NOT_IMPLEMENTED',
          message: 'Claiming multiple Steam keys at once is not supported.',
        });
      }
      return this.#activate(userId, inventoryId, opts);
    }

    if (isEtCeteraDecrementOpts(opts)) {
      return this.#sell(userId, opts);
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

    return inventory.quantity;
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
    if (isCombatItemId(itemId)) {
      return COMBAT_ITEM_DAMAGE[itemId];
    }
    if (isCurrencyItemId(itemId)) {
      return 1;
    }

    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Item ID ${itemId} cannot be used for damage calculation.`,
    });
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
