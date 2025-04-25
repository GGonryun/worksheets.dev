// import { developers, SeedableDeveloper } from '@worksheets/data/developers';
// import { prisma } from '@worksheets/prisma';
// import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

// export const insertDevelopers = async () => {
//   const pendingDevelopers = Object.values(developers);

//   const storedDevelopers = await prisma.developer.findMany({
//     select: seedingProperties,
//   });

//   const { creating, updating } = getSeedingChanges(
//     pendingDevelopers,
//     storedDevelopers
//   );

//   await prisma.developer.createMany({
//     data: creating.map(convertDeveloper),
//     skipDuplicates: true,
//   });

//   for (const update of updating) {
//     await prisma.developer.update({
//       where: { id: update.id },
//       data: convertDeveloper(update),
//     });
//   }

//   if (creating.length > 0 || updating.length > 0) {
//     console.info(`Inserted developers`, {
//       created: creating.length,
//       updated: updating.length,
//     });
//   } else {
//     console.info(`No changes to developers`);
//   }
// };

// const convertDeveloper = (developer: SeedableDeveloper) => ({
//   id: developer.id,
//   version: developer.version,
//   name: developer.name,
//   logoUrl: developer.avatarUrl,
//   description: developer.description,
//   links: JSON.stringify(developer.socials),
// });
