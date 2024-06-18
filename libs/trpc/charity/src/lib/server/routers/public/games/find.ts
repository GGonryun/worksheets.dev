import { TRPCError } from '@trpc/server';
import { printDate } from '@worksheets/util/time';
import {
  DeveloperSchema,
  GameTag,
  SerializableGameSchema,
  serializableLoot,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(
    z.object({
      game: z.custom<SerializableGameSchema>(),
      developer: z.custom<DeveloperSchema>(),
    })
  )
  .query(async ({ input: { gameId }, ctx: { db } }) => {
    const game = await db.game.findFirst({
      where: {
        id: gameId,
      },
      include: {
        developer: true,
        file: true,
        viewport: true,
        categories: true,
        loot: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!game) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Game with id ${gameId} not found`,
      });
    }

    return {
      game: {
        id: game.id,
        name: game.title,
        plays: game.plays,
        likes: game.likes,
        dislikes: game.dislikes,
        description: game.description,
        developerId: game.developerId,
        iconUrl: game.thumbnail,
        bannerUrl: game.cover,
        trailer: game.trailer,
        loot: game.loot.map(serializableLoot),
        leaderboard: game.leaderboard,
        multiplier: game.multiplier,
        categories: game.categories.map((c) => c.categoryId) as GameTag[],
        updatedAt: printDate(game.updatedAt),
        createdAt: printDate(game.createdAt),
        markets: {},
        file: {
          type: game.file.type,
          url: game.file.url,
        },
        viewport: {
          id: game.viewport.id,
          type: game.viewport.type,
          devices: game.viewport.devices,
          orientations: game.viewport.orientations,
        },
      },
      developer: {
        id: game.developer.id,
        name: game.developer.name,
        description: game.developer.description,
        avatarUrl: game.developer.logoUrl,
        socials: JSON.parse(game.developer.links ?? '{}'),
      },
    };
  });
