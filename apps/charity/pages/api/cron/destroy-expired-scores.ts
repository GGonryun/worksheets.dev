import { prisma } from '@worksheets/prisma';
import { cleanUpOldScores } from '@worksheets/services/leaderboards';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  await cleanUpOldScores(prisma);
});
