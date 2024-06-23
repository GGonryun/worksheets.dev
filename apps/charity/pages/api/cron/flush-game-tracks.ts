import { prisma } from '@worksheets/prisma';
import { createClient } from '@worksheets/services/kv';
import {
  gatherLoot,
  generateGameTracks,
  rewardUsers,
  sendNotifications,
} from '@worksheets/services/tracks';
import { createCronJob } from '@worksheets/util/cron';
import { asyncEagerIterate } from '@worksheets/util/generators';

export default createCronJob(async () => {
  const kv = createClient();

  const tracks = await asyncEagerIterate(generateGameTracks(kv));

  const { loots, notifications } = await gatherLoot(prisma, tracks);

  // for every item we'll update the user's inventory
  await rewardUsers(prisma, loots);
  await sendNotifications(prisma, notifications);
});
