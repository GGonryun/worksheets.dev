import { QuestId } from '@worksheets/data/quests';
import {
  QuestCategory,
  QuestFrequency,
  QuestStatus,
  QuestType,
} from '@worksheets/prisma';
import { QuestsService } from '@worksheets/services/quests';
import { detailedQuestSchema, QuestTypeInput } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

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
            id: z.string(),
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
        ctx: { user, db },
      }) => {
        const quests = new QuestsService(db);
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
        questId: z.string(),
      })
    )
    .output(detailedQuestSchema)
    .query(async ({ input: { questId }, ctx: { user, db } }) => {
      const quests = new QuestsService(db);

      // TODO: type gets bricked here
      const quest = await quests.find({ questId, userId: user.id });
      return quest as any;
    }),
  track: protectedProcedure
    .input(
      z.union([
        z.object({
          questId: z.string(),
          input: z.custom<QuestTypeInput>(),
        }),
        z.object({
          questType: z.nativeEnum(QuestType),
          input: z.custom<QuestTypeInput>(),
        }),
      ])
    )
    .mutation(async ({ input, ctx: { user, db } }) => {
      const quests = new QuestsService(db);
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
