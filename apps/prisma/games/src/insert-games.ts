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
        version: game.version,
        id: game.id,
        plays: 0,
        likes: 0,
        dislikes: 0,
        title: game.name,
        description: game.description,
        thumbnail: game.iconUrl,
        cover: game.bannerUrl,
        status: game.publishAt ? 'UNPUBLISHED' : 'PUBLISHED',
        createdAt: new Date(game.createdAt),
        updatedAt: new Date(game.updatedAt),
        trailer: game.trailer,
        developer: {
          connect: {
            id: game.developerId,
          },
        },
        file: {
          create: {
            id: game.id,
            type: game.file.type,
            url: game.file.url,
          },
        },
        viewport: {
          connect: {
            id: game.viewport.id,
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

    if (game.publishAt) {
      await tx.gamePublishAlert.create({
        data: {
          triggerAt: game.publishAt ?? new Date(),
          gameId: game.id,
        },
      });
    }
  });
};

const updateGame = async (game: SeedableGameSchema) => {
  await prisma.$transaction(async (tx) => {
    // find and delete the original game file.
    const existing = await tx.game.findFirst({
      where: { id: game.id },
      include: {
        file: true,
        developer: true,
        viewport: true,
      },
    });

    const updateFile =
      existing.file.url !== game.file.url ||
      existing.file.type !== game.file.type;

    const updateDeveloper = existing.developer.id !== game.developerId;

    const updateViewport = existing.viewport.id !== game.viewport.id;

    await tx.game.update({
      where: {
        id: game.id,
      },
      data: {
        id: game.id,
        title: game.name,
        description: game.description,
        thumbnail: game.iconUrl,
        cover: game.bannerUrl,
        version: game.version,
        trailer: game.trailer,
        developer: updateDeveloper
          ? {
              connect: {
                id: game.developerId,
              },
            }
          : undefined,
        viewport: updateViewport
          ? {
              connect: {
                id: game.viewport.id,
              },
            }
          : undefined,
        file: updateFile
          ? {
              create: {
                id: game.id,
                type: game.file.type,
                url: game.file.url,
              },
            }
          : undefined,
      },
    });

    if (updateFile) {
      // TODO: under certain circumstances the old file might need to be cleaned up from google cloud storage.
      await tx.gameFile.delete({
        where: {
          id: existing.file.url,
        },
      });
    }
  });
};
