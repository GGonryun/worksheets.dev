import { prizes, SeedablePrize } from '@worksheets/data/prizes';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertPrizes = async () => {
  const storedPrizes = await prisma.prize.findMany({
    select: seedingProperties,
  });

  const { updating, creating } = getSeedingChanges(prizes, storedPrizes);
  await prisma.prize.createMany({
    data: creating.map(convertPrize),
    skipDuplicates: true,
  });

  for (const update of updating) {
    await prisma.prize.update({
      where: {
        id: update.id,
      },
      data: convertPrize(update),
    });
  }

  if (creating.length === 0 && updating.length === 0) {
    console.info(`No changes to prizes`);
  } else {
    console.info(`Inserted prizes`, {
      updated: updating.length,
      created: creating.length,
    });
  }
};

const convertPrize = (prize: SeedablePrize) => ({
  ...prize,
});
