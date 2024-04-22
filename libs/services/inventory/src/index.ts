import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import {
  ItemType,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { assertNever } from '@worksheets/util/errors';
import {
  STARTING_GIFT_BOXES,
  STARTING_SMALL_CHESTS,
  STARTING_SWORDS,
  STARTING_TOKENS,
} from '@worksheets/util/settings';
import { daysFromNow, isExpired } from '@worksheets/util/time';
import { InventoryItemSchema } from '@worksheets/util/types';
import pluralize from 'pluralize';

import {
  consumeLargeChest,
  consumeSmallChest,
  consumeWeaponCrate,
} from './consume';
import {
  unactivatable,
  unawardable,
  unconsumable,
  unincrementable,
  unsharable,
  unusable,
} from './errors';
import { shareLargeGiftBox, shareLoveLetter, shareSmallGiftBox } from './share';

export type IncrementOptions = {
  userId: string;
  amount: number;
};

export type FindItemsOptions = {
  userId: string;
  itemIds: ItemId[];
};

export type PendingItemUseState = {
  action: 'pending';
};

export type LoadingItemUseState = {
  action: 'loading';
};

export type RedirectItemUseState = {
  action: 'redirect';
  url: string;
};

export type ConsumeItemUseState = {
  action: 'consume';
  message: string;
};

export type ActivateItemUseState = {
  action: 'activate';
  warning: string;
};

export type ShareItemUseState = {
  action: 'share';
};

export type ItemUseState =
  | PendingItemUseState
  | LoadingItemUseState
  | RedirectItemUseState
  | ConsumeItemUseState
  | ActivateItemUseState
  | ShareItemUseState;

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
      this.increment(userId, '1', STARTING_TOKENS),
      this.increment(userId, '2', STARTING_SMALL_CHESTS),
      this.increment(userId, '3', STARTING_GIFT_BOXES),
      this.increment(userId, '1002', STARTING_SWORDS),
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
    const instance = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
      select: {
        id: true,
        quantity: true,
      },
    });

    if (!instance || instance.quantity < amount) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Insufficient quantity of item.`,
      });
    }

    const update = await this.#db.inventory.update({
      where: {
        id: instance.id,
      },
      data: {
        quantity: {
          decrement: amount,
        },
      },
    });

    return update.quantity;
  }

  /** Incrementing is allowed on any prize that can stack and does not expire. Throws an error if you try to increment a stackable item */
  async increment(userId: string, itemId: ItemId, amount: number) {
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
        return this.#increment(userId, itemId, amount);
      case '0':
      case '4':
        throw unincrementable(itemId);
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

  /** Awarding is used to safely increment or add items to a users inventory. Items like steam keys cannot stack, awarding takes care of this*/
  async award(userId: string, itemId: ItemId, quantity: number) {
    switch (itemId) {
      case '0':
        throw unawardable(itemId);
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
        return this.#increment(userId, itemId, quantity);
      case '4':
        return this.#award(userId, '4', quantity);
      default:
        throw assertNever(itemId);
    }
  }
  /** Creates a new instance of an item that expires after some time. */
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
   * 'use' is used by the usage modal on the inventory screen to determine
   *  which action the player can take on a given item and the modal's message
   */
  async use(userId: string, itemId: ItemId): Promise<ItemUseState> {
    const inventory = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
      select: {
        quantity: true,
      },
    });

    if (!inventory || !inventory.quantity) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Item was not found in inventory.`,
      });
    }

    switch (itemId) {
      case '0':
      case '1':
        throw unusable(itemId);

      case '7':
      case '6':
      case '3':
        return {
          action: 'share',
        };
      case '2':
      case '5':
        return {
          action: 'consume',
          message: 'How many treasure chests would you like to open?',
        };

      case '4': {
        return {
          action: 'activate',
          warning:
            'You will receive a random Steam Key. This action cannot be undone. Are you sure you want to proceed?',
        };
      }

      case '1000':
        return {
          action: 'consume',
          message: 'How many weapon crates would you like to open?',
        };
      case '1001':
      case '1002':
      case '1003':
      case '1004':
        return {
          action: 'redirect',
          url: routes.battles.path(),
        };
      default:
        throw assertNever(itemId);
    }
  }

  /**
   * Consume can only be used to open consumable items.
   */
  async consume(
    userId: string,
    opts: { itemId: ItemId; quantity: number }
  ): Promise<string> {
    const { itemId, quantity } = opts;
    const inventory = await this.#db.inventory.findFirst({
      where: {
        userId,
        itemId,
      },
      select: {
        quantity: true,
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

    if (!inventory.quantity || inventory.quantity < quantity) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Not enough ${pluralize(inventory.item.name, 2)} to consume`,
      });
    }

    switch (itemId) {
      case '0':
      case '1':
      case '3':
      case '4':
      case '6':
      case '7':
      case '1001':
      case '1002':
      case '1003':
      case '1004':
        throw unconsumable(itemId);
      case '2':
        return consumeSmallChest({
          userId,
          quantity,
          itemId,
          inventory: this,
        });
      case '5':
        return consumeLargeChest({
          userId,
          quantity,
          itemId,
          inventory: this,
        });
      case '1000':
        return consumeWeaponCrate({
          userId,
          quantity,
          itemId,
          inventory: this,
        });
      default:
        throw assertNever(itemId);
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
    switch (itemId) {
      case '0':
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
        throw unactivatable(inventory.itemId);
      case '4':
        return this.#activateSteamKey({
          userId,
          inventoryId,
          itemId,
          item: inventory.item,
        });
      default:
        throw assertNever(itemId);
    }
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
      case '0':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '1000':
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Item ID ${itemId} cannot be used for damage calculation.`,
        });
      case '1':
        return 1;
      case '1001':
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

  /** Sharing an item with another user sends something to their inventory */
  async share(
    userId: string,
    opts: { itemId: ItemId; quantity: number; friendId: string }
  ) {
    const { itemId } = opts;
    switch (itemId) {
      case '3':
        return shareSmallGiftBox({ ...opts, itemId, userId, inventory: this });
      case '6':
        return shareLargeGiftBox({ ...opts, itemId, userId, inventory: this });
      case '7':
        return shareLoveLetter({ ...opts, itemId, userId, inventory: this });
      case '0':
      case '1':
      case '2':
      case '4':
      case '5':
      case '1000':
      case '1001':
      case '1002':
      case '1003':
      case '1004':
        throw unsharable(itemId);
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
