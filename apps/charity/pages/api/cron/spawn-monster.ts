import { prisma } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { MobsService } from '@worksheets/services/mobs';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async (_, res) => {
  const notifications = new NotificationsService(prisma);
  const mobs = new MobsService(prisma);
  const spawned = await mobs.spawnMonster();

  if (!spawned) {
    return;
  }
  console.info(`${spawned.mobName} has spawned!`);

  if (spawned.type === 'BOSS') {
    await notifications.send('new-battle', spawned);
  }

  await res.revalidate(
    routes.battle.path({
      params: {
        battleId: spawned.battleId,
      },
    })
  );

  await prisma.battleLogs.create({
    data: {
      battleId: spawned.battleId,
      message: `The battle against ${spawned.mobName} has started!`,
    },
  });
});
