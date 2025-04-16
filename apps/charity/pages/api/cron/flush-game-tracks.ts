import { prisma } from '@worksheets/prisma';
import { createClient } from '@worksheets/services/kv';
import {
  generateGameTracks,
  processAnalyticsTracks,
  processGameTracks,
  processUserTracks,
} from '@worksheets/services/tracks';
import { createCronJob } from '@worksheets/util/cron';
import { asyncEagerIterate } from '@worksheets/util/generators';

export default createCronJob(async () => {
  const kv = createClient();
  const tracks = await asyncEagerIterate(generateGameTracks(kv));

  await processUserTracks(prisma, tracks);
  await processGameTracks(prisma, tracks);
  await processAnalyticsTracks(prisma, tracks);
});
