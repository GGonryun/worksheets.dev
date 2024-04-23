import { prisma } from '@worksheets/prisma';

import { insertCategories } from './insert-categories';
import { insertDevelopers } from './insert-developers';
import { insertGames } from './insert-games';
import { insertItems } from './insert-items';
import { insertMobs } from './insert-mobs';
import { insertQuests } from './insert-quests';
import { insertSponsors } from './insert-sponsors';
import { insertViewports } from './insert-viewports';

async function main() {
  try {
    await insertCategories();
    await insertViewports();
    await insertDevelopers();
    await insertSponsors();
    await insertItems();
    await insertMobs();
    await insertGames();
    await insertQuests();
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
