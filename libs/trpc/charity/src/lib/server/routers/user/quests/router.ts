import { QuestsService } from '@worksheets/services/quests';
import {
  Quest,
  QuestCategory,
  QuestFrequency,
  QuestId,
  QuestInput,
  QuestStatus,
  QuestType,
  QuestTypeInput,
} from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

const quests = new QuestsService();

export default t.router({
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
        statuses: z.array(z.nativeEnum(QuestStatus)).optional(),
        categories: z.array(z.nativeEnum(QuestCategory)).optional(),
        frequencies: z.array(z.nativeEnum(QuestFrequency)).optional(),
      })
    )
    .output(
      z.object({
        items: z.array(
          z.object({
            id: z.custom<QuestId>(),
            order: z.number(),
            status: z.nativeEnum(QuestStatus),
          })
        ),
        nextCursor: z.number().nullish(),
      })
    )
    .query(
      async ({
        input: { cursor, limit, statuses, frequencies, categories },
        ctx: { user },
      }) => {
        const items = await quests.list({
          statuses,
          frequencies,
          categories,
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
      }
    ),
  find: protectedProcedure
    .input(
      z.object({
        questId: z.custom<QuestId>(),
      })
    )
    .output(z.custom<Quest>())
    .query(async ({ input: { questId }, ctx: { user } }) => {
      return await quests.find({ questId, userId: user.id });
    }),
  track: protectedProcedure
    .input(
      z.union([
        z.object({
          questId: z.custom<QuestId>(),
          input: z.custom<QuestInput<QuestId>>(),
        }),
        z.object({
          questType: z.nativeEnum(QuestType),
          input: z.custom<QuestTypeInput<QuestType>>(),
        }),
      ])
    )
    .mutation(async ({ input, ctx: { user } }) => {
      if ('questId' in input) {
        return await quests.trackId({
          userId: user.id,
          questId: input.questId,
          input: input.input,
        });
      } else {
        return await quests.trackType({
          userId: user.id,
          questType: input.questType,
          input: input.input,
        });
      }
    }),
});
