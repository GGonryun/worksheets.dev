import { SeedableSponsor, sponsors } from '@worksheets/data/sponsors';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertSponsors = async () => {
  const storedSponsors = await prisma.sponsor.findMany({
    select: seedingProperties,
  });

  const { creating, updating } = getSeedingChanges(sponsors, storedSponsors);

  await prisma.sponsor.createMany({
    data: creating.map(convertSponsor),
    skipDuplicates: true,
  });

  for (const update of updating) {
    await prisma.sponsor.update({
      where: {
        id: update.id,
      },
      data: {
        logo: update.logo,
        name: update.name,
        version: update.version,
        url: update.url,
      },
    });
  }

  if (creating.length > 0 || updating.length > 0) {
    console.info(`Inserted sponsors`, {
      created: creating.length,
      updated: updating.length,
    });
  } else {
    console.info(`No changes to sponsors`);
  }
};

const convertSponsor = (sponsor: SeedableSponsor) => ({
  id: sponsor.id,
  logo: sponsor.logo,
  name: sponsor.name,
  version: sponsor.version,
  url: sponsor.url,
});
