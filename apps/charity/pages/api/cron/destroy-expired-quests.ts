import { QuestsService } from '@worksheets/services/quests';
import { createCronJob } from '@worksheets/util/cron';

const quests = new QuestsService();

export default createCronJob(async () => {
  const result = await quests.destroyExpired();
  console.info(`Destroyed ${result.count} expired notifications`);
});
