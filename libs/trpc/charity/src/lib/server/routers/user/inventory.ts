import { TRPCError } from '@trpc/server';
import { ItemId, SharableItemId, SHARE_RATES } from '@worksheets/data/items';
import { FriendshipService } from '@worksheets/services/friendship';
import {
  CapsuleService,
  InventoryService,
  PrizeWheelService,
} from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { retryTransaction } from '@worksheets/util/prisma';
import {
  DecrementOpts,
  inventoryItemSchema,
  isSteamKeyItemId,
} from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  count: protectedProcedure
    .output(z.number())
    .query(async ({ ctx: { db, user } }) => {
      const inventory = new InventoryService(db);
      return inventory.count(user.id);
    }),
  quantity: protectedProcedure
    .input(z.custom<ItemId>())
    .output(z.number())
    .query(async ({ input, ctx: { db, user } }) => {
      const inventory = new InventoryService(db);
      return inventory.quantity(user.id, input);
    }),
  autoSell: protectedProcedure
    .output(z.number())
    .mutation(async ({ ctx: { db, user } }) => {
      return await retryTransaction(db, async (tx) => {
        const inventory = new InventoryService(tx);
        return inventory.autoSell(user.id);
      });
    }),
  items: protectedProcedure
    .input(z.custom<Parameters<InventoryService['items']>[1]>())
    .output(z.array(inventoryItemSchema))
    .query(async ({ input: types, ctx: { db, user } }) => {
      return await db.$transaction(async (tx) => {
        const inventory = new InventoryService(tx);
        return inventory.items(user.id, types);
      });
    }),

  decrement: protectedProcedure
    .input(
      z.object({
        itemId: z.custom<ItemId>(),
        quantity: z.number(),
        friendId: z.string().optional(),
      })
    )
    .output(z.custom<Awaited<ReturnType<InventoryService['decrement']>>>())
    .mutation(async ({ input, ctx: { db, user } }) => {
      return await retryTransaction(db, async (tx) => {
        const inventory = new InventoryService(tx);
        return await inventory.decrement(user.id, input as DecrementOpts);
      });
    }),
  activate: protectedProcedure
    .input(z.custom<ItemId>())
    .output(z.custom<Awaited<ReturnType<InventoryService['decrement']>>>())
    .mutation(async ({ input, ctx: { db, user } }) => {
      // TODO: support other activatable items like gift cards.
      if (!isSteamKeyItemId(input))
        throw new TRPCError({
          code: 'NOT_IMPLEMENTED',
          message: 'Only steam keys can be activated',
        });

      // execute the activation in a transaction to prevent multiple users from getting
      // the same code and to prevent race conditions with expiring codes
      return await db.$transaction(async (tx) => {
        const inventory = new InventoryService(tx);
        return await inventory.decrement(user.id, {
          itemId: input,
          // TODO: support activating multiple items at once
          quantity: 1,
        } as DecrementOpts);
      });
    }),
  share: protectedProcedure
    .input(
      z.object({
        friendshipId: z.string(),
        itemId: z.custom<ItemId>(),
        quantity: z.number(),
      })
    )
    .output(z.custom<Awaited<ReturnType<InventoryService['decrement']>>>())
    .mutation(async ({ input, ctx: { db, user } }) => {
      const notification = new NotificationsService(db);
      const friends = new FriendshipService(db);
      const inventory = new InventoryService(db);
      const friendship = await friends.get(input.friendshipId);

      const result = await inventory.decrement(user.id, {
        friendId: friendship.friendId,
        itemId: input.itemId as SharableItemId,
        quantity: input.quantity,
      });

      // TODO: if this is too slow, we can wrap it in a fireAndForgetFn
      const item = await inventory.getItem(input.itemId);
      const rate = SHARE_RATES[input.itemId as SharableItemId];
      const giving = rate.friend * input.quantity;
      await notification.send('share-gift', {
        friendId: friendship.friendId,
        from: user,
        giving,
        quantity: input.quantity,
        item,
      });

      return result;
    }),
  capsule: t.router({
    get: protectedProcedure
      .input(z.custom<Parameters<CapsuleService['getOrCreate']>[1]>())
      .output(z.custom<Awaited<ReturnType<CapsuleService['getOrCreate']>>>())
      .query(async ({ input, ctx: { db, user } }) => {
        return await retryTransaction(db, async (tx) => {
          const capsule = new CapsuleService(tx);
          return capsule.getOrCreate(user.id, input);
        });
      }),
    unlock: protectedProcedure
      .input(z.custom<Parameters<CapsuleService['unlock']>[1]>())
      .output(z.custom<Awaited<ReturnType<CapsuleService['unlock']>>>())
      .mutation(async ({ input, ctx: { db, user } }) => {
        return await retryTransaction(db, async (tx) => {
          const capsule = new CapsuleService(tx);
          return capsule.unlock(user.id, input);
        });
      }),
    open: protectedProcedure
      .input(z.custom<Parameters<CapsuleService['open']>[1]>())
      .output(z.custom<Awaited<ReturnType<CapsuleService['open']>>>())
      .mutation(async ({ input, ctx: { db, user } }) => {
        return await retryTransaction(db, async (tx) => {
          const capsule = new CapsuleService(tx);
          return capsule.open(user.id, input);
        });
      }),
    close: protectedProcedure
      .input(z.custom<Parameters<CapsuleService['close']>[1]>())
      .output(z.custom<Awaited<ReturnType<CapsuleService['close']>>>())
      .mutation(async ({ input, ctx: { db, user } }) => {
        return await retryTransaction(db, async (tx) => {
          const capsule = new CapsuleService(tx);
          return capsule.close(user.id, input);
        });
      }),
    award: protectedProcedure
      .input(z.custom<Parameters<CapsuleService['award']>[1]>())
      .output(z.custom<Awaited<ReturnType<CapsuleService['award']>>>())
      .mutation(async ({ input, ctx: { db, user } }) => {
        return await retryTransaction(db, async (tx) => {
          const capsule = new CapsuleService(tx);
          return capsule.award(user.id, input);
        });
      }),
  }),
  prizeWheel: t.router({
    spin: protectedProcedure
      .input(z.custom<Parameters<PrizeWheelService['spin']>[1]>())
      .output(z.custom<Awaited<ReturnType<PrizeWheelService['spin']>>>())
      .mutation(async ({ ctx: { db, user }, input }) => {
        return await retryTransaction(db, async (tx) => {
          const spinner = new PrizeWheelService(tx);
          return spinner.spin(user.id, input);
        });
      }),
  }),
});
