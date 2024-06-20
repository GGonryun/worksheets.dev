import { prisma } from '@worksheets/prisma';
import { MobsService } from '@worksheets/services/mobs';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const notifications = new NotificationsService(prisma);
  const mobs = new MobsService(prisma);
  const published = await mobs.publishAll();

  console.info(`Published ${published.length} battles`);

  if (published.length === 0) return;

  await Promise.all([
    ...published.map((battle) => notifications.send('new-battle', battle)),
    prisma.battleLogs.createMany({
      data: published.map((battle) => ({
        battleId: battle.battleId,
        message: `The battle against ${battle.mobName} has started!`,
      })),
    }),
  ]);
});
