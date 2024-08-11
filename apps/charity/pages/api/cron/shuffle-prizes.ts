import { prisma } from '@worksheets/prisma';
import { PrizeService } from '@worksheets/services/prizes';
import { createCronJob } from '@worksheets/util/cron';
const shufflePrizes = async () => {
  const service = new PrizeService(prisma);
  await service.shuffle();
};

export default createCronJob(shufflePrizes);
