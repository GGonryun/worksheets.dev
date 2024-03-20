import { prizes, SeedablePrize } from '@worksheets/data/prizes';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertPrizes = async () => {
  const changes = await prisma.$transaction(async (tx) => {
    const storedPrizes = await tx.prize.findMany({
      select: seedingProperties,
    });

    const { updating, creating } = getSeedingChanges(prizes, storedPrizes);

    await Promise.all([
      tx.prize.createMany({
        data: creating.map(convertPrize),
        skipDuplicates: true,
      }),
      tx.prize.updateMany({
        data: updating.map(convertPrize),
      }),
    ]);

    return {
      pending: prizes.length,
      stored: storedPrizes.length,
      updated: updating.length,
      created: creating.length,
    };
  });

  console.info(`Inserted prizes`, changes);
};

const convertPrize = (prize: SeedablePrize) => ({
  ...prize,
});
