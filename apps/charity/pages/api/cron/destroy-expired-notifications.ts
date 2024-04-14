import { prisma } from '@worksheets/prisma';
import { PushService } from '@worksheets/services/push';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const push = new PushService(prisma);
  await push.destroyExpiredNotifications();
});
