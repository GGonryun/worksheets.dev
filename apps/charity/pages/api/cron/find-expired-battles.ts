import { prisma } from '@worksheets/prisma';
import { MobsService } from '@worksheets/services/mobs';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const processed = await prisma.$transaction(async (tx) => {
    const mobs = new MobsService(tx);

    return await mobs.processExpiredBattles();
  });

  console.info('Processed battles:', processed.length);

  const notifications = new NotificationsService(prisma);
  for (const result of processed) {
    const mob = {
      name: result.battle.mob.name,
      battleId: result.battle.id,
      loot: result.battle.mob.loot.reduce((a, l) => a + l.quantity, 0),
    };

    await Promise.all([
      notifications.send('battle-completed', {
        mvp: result.mvp.user.username,
        userIds: result.losers.map((w) => w.user.id),
        mob,
      }),
      notifications.send('battle-mvp-awarded', {
        userId: result.mvp.user.id,
        mob,
      }),
      notifications.send('battle-loot-awarded', {
        userIds: result.winners.map((w) => w.user.id),
        mob,
      }),
    ]);
  }

  console.info('All notifications sent.');
});
