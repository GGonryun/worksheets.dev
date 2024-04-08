import { prisma } from '@worksheets/prisma';

import { insertCodes } from './insert-codes';
import { insertPrizes } from './insert-prizes';
import { insertRaffles } from './insert-raffles';
import { insertSponsors } from './insert-sponsors';

async function main() {
  try {
    await insertSponsors();

    await insertPrizes();

    await insertRaffles();

    await insertCodes();
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
