import { TRPCError } from '@trpc/server';
import {
  CAPSULE_DROP_RATES,
  CAPSULE_PREMIUM_DROP_RATE,
  CapsuleItemId,
  COMBAT_ITEM_DAMAGE,
  CONSUMPTION_RATES,
  isLotteryItems,
  isRandomTokenQuantity,
  Item,
  ItemId,
  RARITY_BAGS,
  SHARE_RATES,
} from '@worksheets/data/items';
import {
  ItemType,
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import {
  arrayFromNumber,
  randomArrayElement,
  shuffle,
} from '@worksheets/util/arrays';
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
  InventoryCapsuleSchema,
  InventoryItemSchema,
  isCapsuleDecrementOpts,
  isCapsuleItemId,
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

    if (isCapsuleDecrementOpts(opts)) {
      console.error(
        'Capsules should only be managed using the capsule service.'
      );
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Capsules are not decrementable.',
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
    console.info('Consuming', { itemId: opts.itemId, quantity: opts.quantity });

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

      await Promise.all(
        Object.entries(groupItems).map(([itemId, quantity]) =>
          this.increment(userId, itemId as ItemId, quantity)
        )
      );

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

export class CapsuleService {
  #db: PrismaClient | PrismaTransactionalClient;
  #inventory: InventoryService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#inventory = new InventoryService(db);
  }

  // get tries to access a capsule by itemId if it can't find one it will create a new one if the user has enough capsules.
  async getOrCreate(
    userId: string,
    opts: {
      itemId: ItemId;
    }
  ): Promise<InventoryCapsuleSchema> {
    const { itemId } = opts;
    if (!isCapsuleItemId(itemId)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Item ID ${itemId} is not a capsule.`,
      });
    }

    const inventory = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
      include: {
        capsule: {
          include: {
            options: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (inventory?.capsule) {
      return this.#obfuscate(inventory.capsule);
    }

    if (!inventory || !inventory.quantity) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `User ${userId} does not have any capsules of type ${itemId}.`,
      });
    }

    return await this.#create(itemId, inventory.id);
  }

  async open(userId: string, opts: { itemId: ItemId }) {
    const { itemId } = opts;
    if (!isCapsuleItemId(itemId)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Item ID ${itemId} is not a capsule.`,
      });
    }

    const inventory = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
      include: {
        capsule: {
          include: {
            options: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (!inventory || !inventory.quantity) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `You do not have enough capsules to open.`,
      });
    }

    if (inventory.capsule) {
      // make sure the user has no unlocks left.
      if (inventory.capsule.unlocks) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You have ${inventory.capsule.unlocks} unlocks remaining.`,
        });
      }
    }

    const update = await this.#db.inventory.update({
      where: {
        id: inventory.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    // delete the old capsule and create a new one.

    await this.#clear(inventory.capsule?.id);

    await this.#create(itemId, inventory.id);

    if (update.quantity < 1) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `You have no capsules left to open.`,
      });
    }
  }
  async close(userId: string, opts: { itemId: ItemId }) {
    const { itemId } = opts;
    if (!isCapsuleItemId(itemId)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Item ID ${itemId} is not a capsule.`,
      });
    }

    const inventory = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
      include: {
        capsule: {
          include: {
            options: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (!inventory || !inventory.quantity) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `You do not have any capsules to close.`,
      });
    }

    if (inventory.capsule) {
      // make sure the user has no unlocks left.
      if (inventory.capsule.unlocks) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You have ${inventory.capsule.unlocks} unlocks remaining.`,
        });
      }
    }

    const update = await this.#db.inventory.update({
      where: {
        id: inventory.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    await this.#clear(inventory.capsule?.id);

    if (update.quantity < 0) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `You cannot close a capsule that you do not have.`,
      });
    }
  }

  async award(userId: string, opts: { capsuleId: string }) {
    const capsule = await this.#db.inventoryCapsule.findFirst({
      where: {
        id: opts.capsuleId,
      },
      include: {
        options: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!capsule) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Capsule ${opts.capsuleId} does not exist.`,
      });
    }

    // check to see if the current capsule has any remaining options.
    const remainingOptions = capsule.options.filter((o) => !o.unlocked);
    if (!remainingOptions.length) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Capsule ${opts.capsuleId} has no remaining options to unlock.`,
      });
    }

    // check to see if there the user has too many unlocks.
    if (capsule.unlocks >= remainingOptions.length) {
      console.warn(
        `User ${userId} already has sufficient unlocks for capsule ${capsule.id}`,
        {
          remainingOptions: remainingOptions.length,
          unlocks: capsule.unlocks,
        }
      );
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `You already have sufficient unlocks for this capsule.`,
      });
    }

    // award them a new unlock.
    await this.#db.inventoryCapsule.update({
      where: {
        id: opts.capsuleId,
      },
      data: {
        unlocks: {
          increment: 1,
        },
      },
    });
  }

  // creates a new capsule item
  async #create(
    itemId: CapsuleItemId,
    inventoryId: string
  ): Promise<InventoryCapsuleSchema> {
    const drops = this.#selectDrops(itemId);

    const capsule = await this.#db.inventoryCapsule.create({
      data: {
        inventoryId,
        unlocks: 5,
        options: {
          // TODO: every capsule contains 9 items, but this can be adjusted in the future.
          create: arrayFromNumber(drops.length).map((i) => ({
            position: i,
            ...drops[i],
          })),
        },
      },
      include: {
        options: {
          include: {
            item: true,
          },
        },
      },
    });

    return this.#obfuscate(capsule);
  }

  #selectDrops(itemId: CapsuleItemId) {
    const items: { itemId: string; quantity: number }[] = [];
    const rates = CAPSULE_DROP_RATES[itemId];
    // TODO: run a validation check to ensure that the sum of all drop rates is 1.
    const premiumRate = CAPSULE_PREMIUM_DROP_RATE[itemId];

    // first insert the premium prize.
    const premiumChance = Math.random();
    if (premiumChance <= premiumRate) {
      // select a random premium item.
      const premiumItem = randomArrayElement(RARITY_BAGS['PREMIUM']);
      items.push({ itemId: premiumItem.id, quantity: 1 });
    }
    // TODO: support more than 9 items in a capsule.
    const remaining = 9 - items.length;
    // then for each remaining drop, select a random item based on the drop rates until we have 9 selections.
    for (let i = 0; i < remaining; i++) {
      // select a random item based on the drop rates.
      let chance = Math.random();
      for (const rarity of [
        'COMMON',
        'UNCOMMON',
        'RARE',
        'LEGENDARY',
        'MYTHIC',
      ] as const) {
        if (chance < 0) {
          console.error('Failed to select a drop rate for capsule', {
            itemId,
            chance,
            rarity,
            rates,
          });
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Invalid drop rate for capsule ${itemId}`,
          });
        }

        const rate = rates[rarity];
        if (chance <= rate) {
          const possible = removeInvalidDrops(RARITY_BAGS[rarity]);
          if (!possible.length) {
            console.log('No valid items for capsule', { itemId, rarity });
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: `No valid items for capsule ${itemId}`,
            });
          }
          const item = randomArrayElement(possible);
          items.push({
            itemId: item.id,
            // TODO: support item quantities.
            quantity: 1,
          });
          break;
        }
        chance -= rate;
      }
    }
    return shuffle(items);
  }

  async #clear(capsuleId?: string | null) {
    if (!capsuleId) {
      return;
    }

    await this.#db.inventoryCapsule.delete({
      where: {
        id: capsuleId,
      },
    });
  }

  #obfuscate(
    capsule: Prisma.InventoryCapsuleGetPayload<{
      include: {
        options: {
          include: {
            item: true;
          };
        };
      };
    }>
  ): InventoryCapsuleSchema {
    return {
      ...capsule,
      options: capsule.options.map((o) =>
        o.unlocked
          ? o
          : {
              ...o,
              item: null,
            }
      ),
      remaining: capsule.options.filter((o) => !o.unlocked).length,
    };
  }

  async unlock(userId: string, opts: { optionId: string }) {
    const option = await this.#db.capsuleOption.findFirst({
      where: {
        id: opts.optionId,
      },
      include: { item: true, capsule: { include: { inventory: true } } },
    });

    if (!option) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Capsule option does not exist`,
      });
    }

    if (option.capsule.inventory.userId !== userId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You do not have permission to unlock this capsule`,
      });
    }

    if (option.unlocked) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Capsule option is already unlocked`,
      });
    }

    await this.#db.inventoryCapsule.update({
      where: {
        id: option.capsuleId,
      },
      data: {
        unlocks: {
          decrement: 1,
        },
      },
    });

    await this.#db.capsuleOption.update({
      where: {
        id: opts.optionId,
      },
      data: {
        unlocked: true,
      },
    });

    await this.#inventory.increment(
      userId,
      option.item.id as ItemId,
      option.quantity
    );

    return {
      rarity: option.item.rarity,
      message: `You found ${option.quantity}x ${pluralize(
        option.item.name,
        option.quantity
      )}!`,
    };
  }
}

const removeInvalidDrops = (items: Item[]) => {
  return items.filter(
    (i) => i.type !== ItemType.CURRENCY && i.type !== ItemType.CAPSULE
  );
};
