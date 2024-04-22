import { ItemId } from '@worksheets/data/items';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { inventoryItemSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  quantity: protectedProcedure
    .input(z.custom<ItemId>())
    .output(z.number())
    .query(async ({ input, ctx: { db, user } }) => {
      const inventory = new InventoryService(db);
      return inventory.quantity(user.id, input);
    }),
  items: protectedProcedure
    .input(z.custom<Parameters<InventoryService['items']>[1]>())
    .output(z.array(inventoryItemSchema))
    .query(async ({ input: types, ctx: { db, user } }) => {
      const inventory = new InventoryService(db);
      return inventory.items(user.id, types);
    }),
  use: protectedProcedure
    .input(z.custom<ItemId>())
    .output(z.custom<Awaited<ReturnType<InventoryService['use']>>>())
    .mutation(async ({ input, ctx: { db, user } }) => {
      const inventory = new InventoryService(db);
      return inventory.use(user.id, input);
    }),
  consume: protectedProcedure
    .input(z.custom<Parameters<InventoryService['consume']>[1]>())
    .output(z.custom<Awaited<ReturnType<InventoryService['consume']>>>())
    .mutation(async ({ input, ctx: { db, user } }) => {
      const inventory = new InventoryService(db);
      return inventory.consume(user.id, input);
    }),
  activate: protectedProcedure
    .input(z.custom<Parameters<InventoryService['activate']>[1]>())
    .output(z.custom<Awaited<ReturnType<InventoryService['activate']>>>())
    .mutation(async ({ input, ctx: { db, user } }) => {
      const notifications = new NotificationsService(db);
      // execute the activation in a transaction to prevent multiple users from getting the same code.
      const data = await db.$transaction(async (tx) => {
        const inventory = new InventoryService(tx);
        return await inventory.activate(user.id, input);
      });

      await notifications.send('activation-code-redeemed', {
        user,
        code: data.code,
        item: data.item,
      });

      return data;
    }),
});
