import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { FriendsPanels } from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import {
  MAX_DAILY_GIFT_BOX_SHARES,
  STARTING_GIFT_BOXES,
  STARTING_TOKENS,
} from '@worksheets/util/settings';
import { daysFromNow, isExpired } from '@worksheets/util/time';
import { InventoryItem } from '@worksheets/util/types';
import pluralize from 'pluralize';

import { consumeLargeChest, consumeSmallChest } from './consume';
import {
  unactivatable,
  unawardable,
  unconsumable,
  unincrementable,
  unusable,
} from './errors';

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

export type ItemUseState =
  | PendingItemUseState
  | LoadingItemUseState
  | RedirectItemUseState
  | ConsumeItemUseState
  | ActivateItemUseState;

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

  async items(userId: string): Promise<InventoryItem[]> {
    const inventory = await this.#db.inventory.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        itemId: true,
        quantity: true,
        expiresAt: true,
      },
      orderBy: {
        itemId: 'asc',
      },
    });
    const ids = inventory.map((i) => i.itemId);

    const items = await this.#db.item.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        type: true,
      },
    });

    return inventory
      .filter((i) => i.quantity > 0)
      .map((inv) => {
        const item = items.find((item) => inv.itemId === item.id);
        if (!item) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Failed to list items in inventory. Contact support.`,
          });
        }
        return {
          ...item,
          inventoryId: inv.id,
          itemId: item.id as ItemId,
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

  async increment(userId: string, itemId: ItemId, amount: number) {
    switch (itemId) {
      case '1':
      case '2':
      case '3':
      case '5':
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

  async award(userId: string, itemId: ItemId) {
    switch (itemId) {
      case '0':
        throw unawardable(itemId);
      case '1':
      case '2':
      case '3':
      case '5':
        return this.#increment(userId, itemId, 1);
      case '4':
        return this.#award(userId, '4');
      default:
        throw assertNever(itemId);
    }
  }
  /** Creates a new instance of an item that expires after some time. */
  async #award(userId: string, itemId: ItemId) {
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

    await this.#db.inventory.create({
      data: {
        userId,
        itemId,
        quantity: 1,
        expiresAt: item.expiration ? daysFromNow(item.expiration) : undefined,
      },
    });
  }

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
      case '3':
        return {
          action: 'redirect',
          url: routes.account.friends.path({
            bookmark: FriendsPanels.SendGifts,
          }),
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
      default:
        throw assertNever(itemId);
    }
  }

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
        throw unconsumable(itemId);
      case '2':
        return consumeSmallChest({
          userId,
          quantity,
          inventory: this,
        });
      case '5':
        return consumeLargeChest({
          userId,
          quantity,
          inventory: this,
        });
      default:
        throw assertNever(itemId);
    }
  }

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
