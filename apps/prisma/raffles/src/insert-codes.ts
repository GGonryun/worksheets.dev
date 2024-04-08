import { codes, SeedableCode } from '@worksheets/data/codes';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges } from '@worksheets/util/seeding';

export const insertCodes = async () => {
  const storedCodes = await prisma.activationCode.findMany({
    select: {
      id: true,
    },
  });

  const { updating, creating } = getSeedingChanges(codes, storedCodes);

  await prisma.activationCode.createMany({
    data: creating.map(convertCode),
  });
  for (const update of updating) {
    await prisma.activationCode.update({
      where: {
        id: update.id,
      },
      data: convertCode(update),
    });
  }

  if (creating.length === 0 && updating.length === 0) {
    console.info(`No changes to codes`);
  } else {
    console.info(`Inserted codes`, {
      updated: updating.length,
      created: creating.length,
    });
  }
};

const convertCode = (code: SeedableCode) => ({
  ...code,
});
