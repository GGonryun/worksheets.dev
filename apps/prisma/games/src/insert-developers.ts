import { developers, SeedableDeveloper } from '@worksheets/data/developers';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertDevelopers = async () => {
  const pendingDevelopers = Object.values(developers);

  const changes = await prisma.$transaction(async (tx) => {
    const storedDevelopers = await tx.developer.findMany({
      select: seedingProperties,
    });

    const { creating, updating } = getSeedingChanges(
      pendingDevelopers,
      storedDevelopers
    );

    Promise.all([
      tx.developer.createMany({
        data: creating.map(convertDeveloper),
        skipDuplicates: true,
      }),

      tx.developer.updateMany({
        data: updating.map(convertDeveloper),
      }),
    ]);

    return {
      pending: pendingDevelopers.length,
      stored: storedDevelopers.length,
      created: creating.length,
      updated: updating.length,
    };
  });

  console.info(`Inserted developers`, changes);
};

const convertDeveloper = (developer: SeedableDeveloper) => ({
  id: developer.id,
  version: developer.version,
  name: developer.name,
  logoUrl: developer.avatarUrl,
  description: developer.description,
  links: JSON.stringify(developer.socials),
});
