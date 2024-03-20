import { prisma } from '@worksheets/prisma';

import { insertCategories } from './insert-categories';
import { insertDevelopers } from './insert-developers';
import { insertGames } from './insert-games';
import { insertViewports } from './insert-viewports';

async function main() {
  try {
    // prerequisites for inserting games can be performed in parallel
    await Promise.all([insertCategories, insertViewports, insertDevelopers]);

    await insertGames();
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
