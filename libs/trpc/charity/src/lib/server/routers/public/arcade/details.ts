import { Prisma } from '@worksheets/prisma';
import { shuffle } from '@worksheets/util/arrays';
import { BasicGameInfo, BasicRaffleDetails } from '@worksheets/util/types';
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
      topRaffles: z.custom<BasicRaffleDetails[]>(),
      topGames: z.custom<BasicGameInfo[]>(),
      allGames: z.custom<BasicGameInfo[]>(),
      newGames: z.custom<BasicGameInfo[]>(),
    })
  )
  .query(async ({ ctx: { db } }) => {
    const [games, topRaffles] = await Promise.all([
      db.game.findMany({
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
      }),
      db.raffle.findMany({
        where: {
          status: 'ACTIVE',
        },
        orderBy: {
          participants: {
            _count: 'desc',
          },
        },
        take: 10,
        select: {
          id: true,
          status: true,
          expiresAt: true,
          item: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              type: true,
            },
          },
          _count: {
            select: {
              participants: true,
            },
          },
        },
      }),
    ]);

    const topGames = [...games].sort((a, b) => b.plays - a.plays).slice(0, 10);

    const newGames = [...games]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    const allGames = [...games];
    const featured = shuffle(uniqBy([...topGames, ...newGames], 'id')).slice(
      0,
      10
    );

    const primary = featured.slice(0, -1);

    const secondary = featured[featured.length - 1];

    return {
      featured: { primary, secondary },
      topRaffles: topRaffles.map(convertRaffle),
      newGames,
      topGames,
      allGames,
    };
  });

const convertRaffle = (
  raffle: Prisma.RaffleGetPayload<{
    select: {
      id: true;
      status: true;
      expiresAt: true;
      item: {
        select: {
          id: true;
          name: true;
          imageUrl: true;
          type: true;
        };
      };
    };
  }>
): BasicRaffleDetails => ({
  id: raffle.id,
  status: raffle.status,
  name: raffle.item.name,
  imageUrl: raffle.item.imageUrl,
  type: raffle.item.type,
  expiresAt: raffle.expiresAt.getTime(),
});
