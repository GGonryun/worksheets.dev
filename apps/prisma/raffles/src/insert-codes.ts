import { codes, SeedableCode } from '@worksheets/data/codes';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertCodes = async () => {
  const changes = await prisma.$transaction(async (tx) => {
    const storedCodes = await tx.activationCode.findMany({
      select: seedingProperties,
    });

    const { updating, creating } = getSeedingChanges(codes, storedCodes);

    await Promise.all([
      tx.activationCode.createMany({
        data: creating.map(convertCode),
        skipDuplicates: true,
      }),
      tx.activationCode.updateMany({
        data: updating.map(convertCode),
      }),
    ]);

    return {
      pending: codes.length,
      stored: storedCodes.length,
      updated: updating.length,
      created: creating.length,
    };
  });

  console.info(`Inserted codes`, changes);
};

const convertCode = (code: SeedableCode) => ({
  ...code,
});
