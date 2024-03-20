import { SeedableTag, tags } from '@worksheets/data/tags';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertCategories = async () => {
  const pendingCategories = Object.values(tags);

  const changes = await prisma.$transaction(async (tx) => {
    const storedCategories = await tx.gameCategory.findMany({
      select: seedingProperties,
    });

    const { creating, updating } = getSeedingChanges(
      pendingCategories,
      storedCategories
    );

    Promise.all([
      tx.gameCategory.createMany({
        data: creating.map(convertTag),
        skipDuplicates: true,
      }),
      tx.gameCategory.updateMany({
        data: updating.map(convertTag),
      }),
    ]);

    return {
      pending: pendingCategories.length,
      stored: storedCategories.length,
      created: creating.length,
      updated: updating.length,
    };
  });

  console.info(`Inserted categories`, changes);
};

const convertTag = (tag: SeedableTag) => ({
  id: tag.id,
  name: tag.name,
  version: tag.version,
  description: tag.description,
  iconUrl: tag.iconUrl,
  relatedCategoryIds: tag.relatedTags,
});
