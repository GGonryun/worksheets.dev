import { PushService } from '@worksheets/services/push';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const push = new PushService();
  const result = await push.destroyExpiredNotifications();
  console.info(`Destroyed ${result.count} expired notifications`);
});
