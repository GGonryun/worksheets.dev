import { SeedableSponsor, sponsors } from '@worksheets/data/sponsors';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertSponsors = async () => {
  const changes = await prisma.$transaction(async (tx) => {
    const storedSponsors = await tx.sponsor.findMany({
      select: seedingProperties,
    });

    const { creating, updating } = getSeedingChanges(sponsors, storedSponsors);

    Promise.all([
      tx.sponsor.createMany({
        data: creating.map(convertSponsor),
        skipDuplicates: true,
      }),
      tx.sponsor.updateMany({
        data: updating.map(convertSponsor),
      }),
    ]);

    return {
      pending: sponsors.length,
      stored: storedSponsors.length,
      created: creating.length,
      updated: updating.length,
    };
  });

  console.info(`Inserted sponsors`, changes);
};

const convertSponsor = (sponsor: SeedableSponsor) => ({
  id: sponsor.id,
  logo: sponsor.logo,
  name: sponsor.name,
  version: sponsor.version,
  url: sponsor.url,
});
