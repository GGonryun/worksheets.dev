import { TRPCError } from '@trpc/server';
import { Prisma, PrismaClient } from '@worksheets/prisma';
import { printDate } from '@worksheets/util/time';
import { GameTag } from '@worksheets/util/types';

export const findGame = async (
  db: PrismaClient,
  options: {
    id: string;
    version?: string;
    accessCheck?: (
      game: Prisma.GameGetPayload<{
        include: {
          developer: true;
          files: true;
          viewport: true;
          categories: true;
          achievements: true;
          team: {
            include: {
              members: true;
            };
          };
        };
      }>
    ) => boolean;
  }
) => {
  const game = await db.game.findFirst({
    where: {
      id: options.id,
    },
    include: {
      developer: true,
      files: true,
      viewport: true,
      categories: true,
      achievements: true,
      team: {
        include: {
          members: true,
        },
      },
    },
  });

  if (!game) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Game not found`,
    });
  }

  if (options.accessCheck && !options.accessCheck(game)) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `You do not have access to this game`,
    });
  }

  const file = game.files.find((f) =>
    options.version ? f.version === options.version : f.isCurrent
  );

  if (!file) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: options.version
        ? `Version ${options.version} of game does not exist`
        : 'Game does not have a current version set',
    });
  }

  return {
    id: game.id,
    teamId: game.teamId ?? 'charity-games',
    name: game.title,
    plays: game.plays,
    likes: game.likes,
    dislikes: game.dislikes,
    description: game.description,
    developerId: game.developerId,
    iconUrl: game.thumbnail,
    bannerUrl: game.cover,
    trailer: game.trailer,
    visibility: game.visibility,
    banner: game.banner,
    status: game.status,
    leaderboard: game.leaderboard,
    cloudStorage: game.cloudStorage,
    achievements: game.achievements.length > 0,
    categories: game.categories.map((c) => c.categoryId) as GameTag[],
    updatedAt: printDate(game.updatedAt),
    createdAt: printDate(game.createdAt),
    markets: {},
    file: {
      type: file.type,
      url: file.url,
    },
    viewport: {
      id: game.viewport.id,
      type: game.viewport.type,
      devices: game.viewport.devices,
      orientations: game.viewport.orientations,
    },
  };
};
