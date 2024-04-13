import { prisma } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { createCronJob } from '@worksheets/util/cron';
import { MAX_DAILY_GIFT_BOX_SHARES } from '@worksheets/util/settings';

export default createCronJob(async () =>
  Promise.all([resetRewards(), prisma.gift.deleteMany()])
);

const resetRewards = async () => {
  const inventory = new InventoryService(prisma);
  await inventory.resetAll('3', MAX_DAILY_GIFT_BOX_SHARES);
};
