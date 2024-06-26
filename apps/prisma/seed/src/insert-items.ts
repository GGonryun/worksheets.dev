import { Item, ITEMS } from '@worksheets/data/items';
import { Prisma, prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertItems = async () => {
  const storedItems = await prisma.item.findMany({
    select: seedingProperties,
  });

  const { updating, creating } = getSeedingChanges(ITEMS, storedItems);
  for (const create of creating) {
    await prisma.item.create({
      data: convertItem(create),
    });
  }

  for (const update of updating) {
    await prisma.item.update({
      where: {
        id: update.id,
      },
      data: convertItem(update),
    });
  }

  if (creating.length === 0 && updating.length === 0) {
    console.info(`No changes to items`);
  } else {
    console.info(`Inserted items`, {
      created: creating.length,
      updated: updating.length,
    });
  }
};

const convertItem = (item: Item): Prisma.ItemCreateInput => {
  return {
    id: item.id,
    version: item.version,
    code: item.code,
    name: item.name,
    buy: item.buy,
    sell: item.sell,
    rarity: item.rarity,
    expiration: item.expiration ?? null,
    description: item.description,
    imageUrl: item.imageUrl,
    type: item.type,
  };
};
