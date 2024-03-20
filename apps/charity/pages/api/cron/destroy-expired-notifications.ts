import { prisma } from '@worksheets/prisma';
import { createCronJob } from '@worksheets/util/cron';
import { daysAgo } from '@worksheets/util/time';

const EXPIRED_NOTIFICATION_THRESHOLD = 7;

export default createCronJob(async () => {
  const expiredNotifications = await prisma.notification.deleteMany({
    where: {
      createdAt: {
        lte: daysAgo(EXPIRED_NOTIFICATION_THRESHOLD),
      },
    },
  });
  console.info(`Deleted ${expiredNotifications.count} expired notifications`);
});
