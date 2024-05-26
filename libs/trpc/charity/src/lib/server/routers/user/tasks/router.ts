import { TasksService } from '@worksheets/services/tasks';
import {
  actionSchema,
  questSchema,
  taskInputSchema,
} from '@worksheets/util/tasks';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  actions: t.router({
    list: protectedProcedure
      .input(z.object({ raffleId: z.number() }))
      .output(z.array(actionSchema))
      .query(async ({ ctx: { db, user }, input: { raffleId } }) => {
        const tasks = new TasksService(db);
        return await tasks.listActions({
          raffleId,
          userId: user.id,
        });
      }),
    track: protectedProcedure
      .input(
        taskInputSchema.extend({
          actionId: z.string(),
        })
      )
      .mutation(async ({ input, ctx: { user, db } }) => {
        const tasks = new TasksService(db);
        console.info('tracking action', input);
        const rewarded = await tasks.trackAction({
          userId: user.id,
          ...input,
        });

        if (rewarded) {
          await tasks.trackQuest({
            questId: 'RAFFLE_PARTICIPATION_DAILY',
            userId: user.id,
            repetitions: rewarded,
          });
        }

        return rewarded;
      }),
  }),
  quests: t.router({
    // TODO: support filtering
    list: protectedProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(100).nullish(),
          cursor: z.number().nullish(),
        })
      )
      .output(
        z.object({
          items: z.array(questSchema),
          nextCursor: z.number().nullish(),
        })
      )
      .query(async ({ input: { cursor, limit }, ctx: { user, db } }) => {
        const quests = new TasksService(db);
        const items = await quests.listQuests({
          userId: user.id,
        });

        const c = cursor ?? 0;
        const l = limit ?? 5;
        const limited = items.slice(c, c + l);
        const nextCursor = c + l;
        return {
          items: limited,
          nextCursor: nextCursor < items.length ? nextCursor : null,
        };
      }),

    // TODO: do not allow users to directly track quests by API.
    track: protectedProcedure
      .input(
        taskInputSchema.extend({
          questId: z.string(),
        })
      )
      .mutation(async ({ input, ctx: { user, db } }) => {
        const tasks = new TasksService(db);
        return await tasks.trackQuest({
          userId: user.id,
          ...input,
        });
      }),
  }),
  poll: t.router({
    // because a poll is associated with a task,
    // it can appear multiple times across different raffles or quests.
    // all the responses are aggregated together.
    results: protectedProcedure
      .input(z.custom<Parameters<TasksService['getPollResults']>[0]>())
      .output(z.custom<Awaited<ReturnType<TasksService['getPollResults']>>>())
      .query(async ({ input, ctx: { db } }) => {
        const tasks = new TasksService(db);

        return await tasks.getPollResults(input);
      }),
  }),
});
