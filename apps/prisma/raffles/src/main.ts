import { prizes } from '@worksheets/data/prizes';
import { sponsors } from '@worksheets/data/sponsors';
import { prisma } from '@worksheets/prisma';
import { hoursFromNow } from '@worksheets/util/time';

async function main() {
  // wait for user input to continue
  await new Promise((resolve) => {
    // ask the user to press enter to continue
    console.log(
      'Press enter to continue generating random prizes for database.'
    );
    process.stdin.resume();
    process.stdin.on('data', resolve);
  });

  // clean up the database before seeding
  await prisma.$transaction(async (tx) => {
    await tx.raffle.deleteMany({});
    await tx.sponsor.deleteMany({});
    await tx.prize.deleteMany({});
  });
  console.info('Cleaned up database');

  try {
    await prisma.$transaction(async (tx) => {
      // insert all sponsors
      await tx.sponsor.createMany({
        data: sponsors,
        skipDuplicates: true,
      });
      console.info('Inserted sponsors');

      const promises = prizes.map((prize) =>
        tx.prize.create({
          data: {
            ...prize,
            raffles: {
              createMany: {
                data: generateRandomRaffles(),
              },
            },
          },
        })
      );

      await Promise.all(promises);
      console.info('Inserted raffles and prizes');
    });
  } catch (error) {
    console.error(error);
  }
  console.info('Finished seeding database');
}

export const generateRandomRaffles = () =>
  Array.from({
    length: Math.floor(Math.random() * 2) + 1,
  }).map((_, i) => ({
    expiresAt: hoursFromNow(Math.floor(Math.random() * 24 * i) + 1),
    costPerEntry: Math.floor(Math.random() * 5 * i) + 1,
    numWinners: 1,
    sponsorId: sponsors[0].id,
    status: 'ACTIVE' as const,
  }));

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
