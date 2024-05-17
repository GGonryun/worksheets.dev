import { prisma } from '@worksheets/prisma';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const action = await prisma.taskProgress.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
  console.info(`Destroyed ${action.count} expired notifications`);
});
