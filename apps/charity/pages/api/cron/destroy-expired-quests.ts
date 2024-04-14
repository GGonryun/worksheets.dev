import { prisma } from '@worksheets/prisma';
import { QuestsService } from '@worksheets/services/quests';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const quests = new QuestsService(prisma);
  await quests.destroyExpired();
});
