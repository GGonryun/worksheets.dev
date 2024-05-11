import { prisma } from '@worksheets/prisma';
import { createCronJob } from '@worksheets/util/cron';
import { daysAgo } from '@worksheets/util/time';

export default createCronJob(async () => {
  const result = await prisma.gamePlayHistory.deleteMany({
    where: {
      createdAt: {
        lt: daysAgo(30),
      },
    },
  });

  if (result.count > 0) {
    console.info('Deleted game history', result);
  } else {
    console.info('No game history to delete');
  }
});
