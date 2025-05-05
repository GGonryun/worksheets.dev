import { games } from '@worksheets/data/games';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';
import { SeedableGameSchema } from '@worksheets/util/types';

export const insertGames = async () => {
  const storedGames = await prisma.game.findMany({
    select: seedingProperties,
  });
  const { creating, updating } = getSeedingChanges(games, storedGames);

  await Promise.all([...creating.map(insertGame), ...updating.map(updateGame)]);
  if (creating.length > 0 || updating.length > 0) {
    console.info(`Inserted games`, {
      created: creating.length,
      updated: updating.length,
    });
  } else {
    console.info(`No changes to games`);
  }
};

const insertGame = async (game: SeedableGameSchema) => {
  await prisma.$transaction(async (tx) => {
    await tx.game.create({
      data: {
        id: game.id,
        version: game.version,
        plays: 0,
        likes: 0,
        dislikes: 0,
        title: game.name,
        description: game.description,
        thumbnail: game.iconUrl,
        cover: game.bannerUrl,
        status: 'APPROVED',
        visibility: 'PUBLIC',
        createdAt: new Date(game.createdAt),
        updatedAt: new Date(game.updatedAt),
        publishAt: game.publishAt,
        trailer: game.trailer,
        leaderboard: game.leaderboard,
        cloudStorage: game.cloudStorage,
        files: {
          create: {
            type: game.file.type,
            url: game.file.url,
            isCurrent: true,
            metadata: {
              name: 'game.zip',
              size: -1,
              type: 'application/zip',
            },
          },
        },
        viewport: {
          connect: {
            id: game.viewport.id,
          },
        },
        team: {
          connect: {
            id: game.teamId,
          },
        },
      },
    });

    await tx.categoriesOnGame.createMany({
      data: game.categories.map((category) => ({
        gameId: game.id,
        categoryId: category,
      })),
      skipDuplicates: true,
    });
  });
};

const updateGame = async (game: SeedableGameSchema) => {
  await prisma.$transaction(async (tx) => {
    await tx.game.update({
      where: {
        id: game.id,
      },
      data: {
        title: game.name,
        description: game.description,
        thumbnail: game.iconUrl,
        cover: game.bannerUrl,
        version: game.version,
        trailer: game.trailer,
        leaderboard: game.leaderboard,
        cloudStorage: game.cloudStorage,
      },
    });
  });
};
