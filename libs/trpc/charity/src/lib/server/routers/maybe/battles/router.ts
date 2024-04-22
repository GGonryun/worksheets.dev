import { ItemId } from '@worksheets/data/items';
import { InventoryService } from '@worksheets/services/inventory';
import { MobsService } from '@worksheets/services/mobs';
import {
  battleParticipationSchema,
  bossBattleSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { maybeProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  list: maybeProcedure
    .input(z.custom<Parameters<MobsService['list']>[0]>())
    .output(z.array(bossBattleSchema))
    .query(async ({ ctx: { db }, input: filters }) => {
      const mobs = new MobsService(db);
      return mobs.list(filters);
    }),
  find: maybeProcedure
    .input(z.number())
    .output(bossBattleSchema)
    .query(async ({ ctx: { db }, input }) => {
      const mobs = new MobsService(db);
      return mobs.find(input);
    }),
  calculateDamage: maybeProcedure
    .input(
      z.object({
        mobId: z.number(),
        items: z.array(
          z.object({
            itemId: z.custom<ItemId>(),
            quantity: z.number(),
          })
        ),
      })
    )
    .output(z.number())
    .query(async ({ ctx: { db }, input: { mobId, items } }) => {
      const inventory = new InventoryService(db);
      const potential = inventory.damage(items);

      return potential;
    }),
  participation: maybeProcedure
    .input(z.number())
    .output(z.array(battleParticipationSchema))
    .query(async ({ ctx: { db }, input }) => {
      const mobs = new MobsService(db);
      return mobs.participation(input);
    }),
});
