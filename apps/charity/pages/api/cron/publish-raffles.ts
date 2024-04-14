import { prisma } from '@worksheets/prisma';
import { RafflesService } from '@worksheets/services/raffles';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const raffles = new RafflesService(prisma);
  await raffles.publishAll();
});
