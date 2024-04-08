import { TRPCError } from '@trpc/server';
import { BasicGameInfo, DeveloperSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(z.object({ developerId: z.string() }))
  .output(
    z.object({
      games: z.custom<BasicGameInfo[]>(),
      developer: z.custom<DeveloperSchema>(),
    })
  )
  .query(async ({ input: { developerId }, ctx: { db } }) => {
    const data = await db.developer.findUnique({
      where: {
        id: developerId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        logoUrl: true,
        links: true,
        games: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            cover: true,
            plays: true,
          },
        },
      },
    });

    if (!data) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Developer not found',
      });
    }

    return {
      games: data.games,
      developer: {
        id: data.id,
        name: data.name,
        description: data.description,
        avatarUrl: data.logoUrl,
        socials: JSON.parse(data.links ?? '{}'),
      },
    };
  });
