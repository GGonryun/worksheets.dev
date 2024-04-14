import { prisma } from '@worksheets/prisma';
import { GamesService } from '@worksheets/services/games';
import { createCronJob } from '@worksheets/util/cron';

const publishGames = async () => {
  const games = new GamesService(prisma);
  await games.publishAll();
};

export default createCronJob(publishGames);
