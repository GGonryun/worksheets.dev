import { prisma } from '@worksheets/prisma';
import { createCronJob } from '@worksheets/util/cron';
import { SESSION_EXPIRATION_DAYS } from '@worksheets/util/settings';
import { daysAgo } from '@worksheets/util/time';

export default createCronJob(async () => {
  // delete sessions older than 1 day
  const count = await prisma.gameSession.deleteMany({
    where: {
      createdAt: {
        lt: daysAgo(SESSION_EXPIRATION_DAYS),
      },
    },
  });

  console.warn(`Deleted ${count.count} expired sessions`);
});
