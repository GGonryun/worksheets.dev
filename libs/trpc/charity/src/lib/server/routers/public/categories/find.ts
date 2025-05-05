import { TRPCError } from '@trpc/server';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  GameTag,
  TagSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      tagId: z.string(),
    })
  )
  .output(
    z.object({
      tag: z.custom<Omit<TagSchema, 'relatedTags'>>(),
      games: z.custom<BasicGameInfo[]>(),
      related: z.custom<BasicCategoryInfo[]>(),
    })
  )
  .query(async ({ input: { tagId }, ctx: { db } }) => {
    const tag = await db.gameCategory.findFirst({
      where: {
        id: tagId,
      },
      select: {
        id: true,
        name: true,
        version: true,
        description: true,
        iconUrl: true,
        relatedCategoryIds: true,
        games: {
          include: {
            game: {
              select: {
                id: true,
                teamId: true,
                title: true,
                thumbnail: true,
                cover: true,
                plays: true,
              },
            },
          },
        },
      },
    });

    if (!tag) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Tag not found',
      });
    }

    const related = await db.gameCategory.findMany({
      where: {
        id: {
          in: tag.relatedCategoryIds,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        iconUrl: true,
      },
    });

    return {
      tag: {
        id: tag.id as GameTag,
        name: tag.name,
        description: tag.description,
        iconUrl: tag.iconUrl,
      },
      related: related.map((r) => ({
        id: r.id,
        name: r.name,
        image: r.iconUrl,
      })),
      games: tag.games.map((g) => g.game),
    };
  });
