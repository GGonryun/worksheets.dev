import { TasksService } from '@worksheets/services/tasks';
import { retryTransaction } from '@worksheets/util/prisma';
import { actionSchema, taskInputSchema } from '@worksheets/util/tasks';
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
          referralCode: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx: { user, db } }) => {
        const { reward } = await retryTransaction(db, async (tx) => {
          const tasks = new TasksService(tx);
          return await tasks.trackAction({
            userId: user.id,
            ...input,
          });
        });

        return reward;
      }),
  }),
  poll: t.router({
    // because a poll is associated with a task,
    // it can appear multiple times across different raffles.
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
