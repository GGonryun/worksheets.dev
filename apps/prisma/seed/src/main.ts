import { GameCategory } from '@prisma/client';
import { prisma } from '@worksheets/prisma';
import { SeedableGameSchema, TagSchema } from '@worksheets/util/types';

import { developers } from './data/developer';
import { games } from './data/games';
import { tags } from './data/tags';
import { viewports } from './data/viewports';

async function main() {
  // clean up the database before seeding
  await prisma.$transaction(async (tx) => {
    await tx.categoriesOnGame.deleteMany({});
    await tx.game.deleteMany({});
    await tx.developer.deleteMany({});
    await tx.gameCategory.deleteMany({});
    await tx.gameFile.deleteMany({});
    await tx.viewport.deleteMany({});
  });

  const newCategories = Object.values(tags).map(convertTag);
  try {
    await prisma.$transaction(async (tx) => {
      // insert all categories
      await tx.gameCategory.createMany({
        data: newCategories,
        skipDuplicates: true,
      });

      // insert all viewports
      await tx.viewport.createMany({
        data: Object.values(viewports).map((viewport) => ({
          id: viewport.id,
          type: viewport.type,
          devices: viewport.devices,
          orientations: viewport.orientations,
        })),
        skipDuplicates: true,
      });

      await tx.developer.createMany({
        data: developers.map((developer) => ({
          id: developer.id,
          name: developer.name,
          logoUrl: developer.avatarUrl,
          description: developer.description,
          links: JSON.stringify(developer.socials),
        })),
        skipDuplicates: true,
      });
    });

    // insert all games
    await Promise.all(games.map(insertGame));
  } catch (error) {
    console.error(error);
  }
}

const insertGame = async (game: SeedableGameSchema) => {
  const entity = await prisma.game.create({
    data: {
      id: game.id,
      plays: 0,
      likes: 0,
      dislikes: 0,
      title: game.name,
      description: game.description,
      thumbnail: game.iconUrl,
      cover: game.bannerUrl,
      developer: {
        connect: {
          id: game.developerId,
        },
      },
      file: {
        create: {
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

  await prisma.categoriesOnGame.createMany({
    data: game.categories.map((category) => ({
      gameId: entity.id,
      categoryId: category,
    })),
    skipDuplicates: true,
  });
};

const convertTag: (tag: TagSchema) => GameCategory = (tag) => ({
  id: tag.id,
  name: tag.name,
  description: tag.description,
  iconUrl: tag.iconUrl,
  relatedCategoryIds: tag.relatedTags,
});

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
