import { MobsService } from '@worksheets/services/mobs';
import {
  battleParticipationSchema,
  battleRecordSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { maybeProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  list: maybeProcedure
    .input(z.custom<Parameters<MobsService['list']>[0]>())
    .output(z.custom<Awaited<ReturnType<MobsService['list']>>>())
    .query(async ({ ctx: { db }, input: filters }) => {
      const mobs = new MobsService(db);
      return mobs.list(filters);
    }),
  find: maybeProcedure
    .input(z.number())
    .output(z.custom<Awaited<ReturnType<MobsService['find']>>>())
    .query(async ({ ctx: { db }, input }) => {
      const mobs = new MobsService(db);
      return mobs.find(input);
    }),
  participation: maybeProcedure
    .input(z.number())
    .output(z.array(battleParticipationSchema))
    .query(async ({ ctx: { db }, input }) => {
      const mobs = new MobsService(db);
      return mobs.participation(input);
    }),
  logs: maybeProcedure
    .input(z.number())
    .output(z.custom<Awaited<ReturnType<MobsService['logs']>>>())
    .query(async ({ ctx: { db }, input }) => {
      const mobs = new MobsService(db);
      return mobs.logs(input);
    }),
  record: maybeProcedure
    .input(z.number())
    .output(battleRecordSchema.nullable())
    .query(async ({ ctx: { db }, input }) => {
      const mobs = new MobsService(db);
      return await mobs.record(input);
    }),
});
