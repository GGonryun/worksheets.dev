import { Prisma } from '@worksheets/prisma';
import { TasksService } from '@worksheets/services/tasks';
import { fireAndForget } from '@worksheets/util/promises';
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
          referralCode: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx: { user, db } }) => {
        const { reward, raffleId } = await db.$transaction(
          async (tx) => {
            const tasks = new TasksService(tx);
            console.info('tracking action', input);
            return await tasks.trackAction({
              userId: user.id,
              ...input,
            });
          },
          {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          }
        );

        if (reward) {
          const tasks = new TasksService(db);
          fireAndForget(
            Promise.all([
              tasks.trackQuest({
                questId: 'RAFFLE_PARTICIPATION_DAILY',
                userId: user.id,
                repetitions: reward,
              }),
              input.referralCode
                ? tasks.trackReferralAction({
                    userId: user.id,
                    referralCode: input.referralCode,
                    raffleId,
                  })
                : Promise.resolve(),
            ])
          );
        }

        return reward;
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
        return await db.$transaction(
          async (tx) => {
            const tasks = new TasksService(tx);
            return await tasks.trackQuest({
              userId: user.id,
              ...input,
            });
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
        );
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
