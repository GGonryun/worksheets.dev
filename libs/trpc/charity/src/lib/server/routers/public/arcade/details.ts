import { Prisma } from '@worksheets/prisma';
import { shuffle } from '@worksheets/util/arrays';
import { BasicGameInfo } from '@worksheets/util/types';
import { uniqBy } from 'lodash';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .output(
    z.object({
      featured: z.object({
        primary: z.custom<BasicGameInfo[]>(),
        secondary: z.custom<BasicGameInfo>(),
      }),
      topGames: z.custom<BasicGameInfo[]>(),
      allGames: z.custom<BasicGameInfo[]>(),
      newGames: z.custom<BasicGameInfo[]>(),
    })
  )
  .query(async ({ ctx: { db } }) => {
    const games = await db.game.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        cover: true,
        plays: true,
        createdAt: true,
      },
    });

    const topGames = [...games]
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 10)
      .map(removeCreatedAt);
    const newGames = [...games]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map(removeCreatedAt);

    const allGames = [...games].map(removeCreatedAt);
    const featured = shuffle(uniqBy([...topGames, ...newGames], 'id')).slice(
      0,
      10
    );

    const primary = featured.slice(0, -1);

    const secondary = featured[featured.length - 1];

    return {
      featured: { primary, secondary },
      newGames,
      topGames,
      allGames,
    };
  });

const removeCreatedAt = (
  game: Prisma.GameGetPayload<{
    select: {
      id: true;
      title: true;
      thumbnail: true;
      cover: true;
      plays: true;
      createdAt: true;
    };
  }>
) => {
  const { createdAt, ...rest } = game;
  return rest;
};
