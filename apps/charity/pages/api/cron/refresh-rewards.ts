import { prisma } from '@worksheets/prisma';
import { FriendshipService } from '@worksheets/services/friendship';
import { InventoryService } from '@worksheets/services/inventory';
import { createCronJob } from '@worksheets/util/cron';
import { MAX_DAILY_GIFT_BOX_SHARES } from '@worksheets/util/settings';

export default createCronJob(async () => {
  const inventory = new InventoryService(prisma);
  const friends = new FriendshipService(prisma);
  await inventory.resetAll('3', MAX_DAILY_GIFT_BOX_SHARES);
  await friends.destroyGifts();
});
