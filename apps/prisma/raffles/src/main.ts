import { prisma } from '@worksheets/prisma';

import { insertPrizes } from './insert-prizes';
import { insertRaffles } from './insert-raffles';
import { insertSponsors } from './insert-sponsors';

async function main() {
  try {
    await insertSponsors();

    await insertPrizes();

    await insertRaffles();
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
