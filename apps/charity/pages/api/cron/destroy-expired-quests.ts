import { QuestsService } from '@worksheets/services/quests';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const quests = new QuestsService();
  const result = await quests.destroyExpired();
  console.info(`Destroyed ${result.count} expired notifications`);
});
