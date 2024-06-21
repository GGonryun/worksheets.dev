import { prisma } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { MobsService } from '@worksheets/services/mobs';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';
import { waitFor } from '@worksheets/util/time';

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

  await prisma.battleLogs.create({
    data: {
      battleId: spawned.battleId,
      message: `The battle against ${spawned.mobName} has started!`,
    },
  });

  await waitFor(3000); // wait for 3 seconds, hopefully enough time for the db changes to be in place.
  await res.revalidate(
    routes.battle.url({
      params: {
        battleId: spawned.battleId,
      },
    })
  );
});
