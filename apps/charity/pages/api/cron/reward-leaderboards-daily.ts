import { prisma } from '@worksheets/prisma';
import { rewardTopPlayers } from '@worksheets/services/leaderboards';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  await rewardTopPlayers(prisma, 'DAILY');
});
