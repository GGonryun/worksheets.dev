import { SeedableTag, tags } from '@worksheets/data/tags';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertCategories = async () => {
  const pendingCategories = Object.values(tags);

  const storedCategories = await prisma.gameCategory.findMany({
    select: seedingProperties,
  });

  const { creating, updating } = getSeedingChanges(
    pendingCategories,
    storedCategories
  );
  await prisma.gameCategory.createMany({
    data: creating.map(convertTag),
    skipDuplicates: true,
  });
  for (const update of updating) {
    await prisma.gameCategory.update({
      where: { id: update.id },
      data: convertTag(update),
    });
  }

  if (creating.length > 0 || updating.length > 0) {
    console.info(`Inserted categories`, {
      created: creating.length,
      updated: updating.length,
    });
  } else {
    console.info(`No changes to categories`);
  }
};

const convertTag = (tag: SeedableTag) => ({
  id: tag.id,
  name: tag.name,
  version: tag.version,
  description: tag.description,
  iconUrl: tag.iconUrl,
  relatedCategoryIds: tag.relatedTags,
});
