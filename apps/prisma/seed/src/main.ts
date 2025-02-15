import { prisma } from '@worksheets/prisma';

import { insertAchievements } from './insert-achievements';
import { insertCategories } from './insert-categories';
import { insertDevelopers } from './insert-developers';
import { insertGames } from './insert-games';
import { insertSponsors } from './insert-sponsors';
import { insertTasks } from './insert-tasks';
import { insertViewports } from './insert-viewports';

async function main() {
  try {
    await insertCategories();
    await insertViewports();
    await insertDevelopers();
    await insertSponsors();
    await insertGames();
    await insertAchievements();
    await insertTasks();
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
