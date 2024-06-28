import { games } from '@worksheets/data/games';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';
import { daysAgo, isExpired } from '@worksheets/util/time';
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
    const published = isExpired(game.publishAt ?? daysAgo(1));
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
        status: published ? 'PUBLISHED' : 'UNPUBLISHED',
        createdAt: new Date(game.createdAt),
        updatedAt: new Date(game.updatedAt),
        publishAt: game.publishAt,
        trailer: game.trailer,
        leaderboard: game.leaderboard,
        multiplier: game.multiplier ?? 0,
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

    if (game.loot.length > 0) {
      await tx.loot.createMany({
        data: game.loot.map((loot) => ({
          gameId: game.id,
          itemId: loot.itemId,
          quantity: loot.quantity,
          chance: loot.chance,
        })),
        skipDuplicates: true,
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

    await tx.gameFile.update({
      where: {
        id: existing.file.id,
      },
      data: {
        type: game.file.type,
        url: game.file.url,
      },
    });

    // TODO: support updating categories

    // TODO: support updating loot

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
      },
    });
  });
};
