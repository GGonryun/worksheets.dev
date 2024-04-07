import { PushService } from '@worksheets/services/push';
import { createCronJob } from '@worksheets/util/cron';

const push = new PushService();

export default createCronJob(async () => {
  const result = await push.destroyExpiredNotifications();
  console.info(`Destroyed ${result.count} expired notifications`);
});
