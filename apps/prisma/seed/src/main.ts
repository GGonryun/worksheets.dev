import { prisma } from '@worksheets/prisma';

import { insertAchievements } from './insert-achievements';
import { insertCategories } from './insert-categories';
import { insertGames } from './insert-games';
import { insertSponsors } from './insert-sponsors';
import { insertTasks } from './insert-tasks';
import { insertTeams } from './insert-teams';
import { insertViewports } from './insert-viewports';

async function main() {
  try {
    await insertTeams();
    await insertCategories();
    await insertViewports();
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
