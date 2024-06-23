import { prisma } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { MobsService } from '@worksheets/services/mobs';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async (_, res) => {
  const mobs = new MobsService(prisma);
  const spawned = await mobs.spawnMonster();

  if (!spawned) {
    return;
  }
  console.info(`${spawned.mobName} has spawned!`);

  // TODO: bosses spawn too often, reduce verbosity
  // if (spawned.type === 'BOSS') {
  //   await notifications.send('new-battle', spawned);
  // }

  await prisma.battleLogs.create({
    data: {
      battleId: spawned.battleId,
      message: `The battle against ${spawned.mobName} has started!`,
    },
  });

  await res.revalidate(
    routes.battle.path({
      params: {
        battleId: spawned.battleId,
      },
    })
  );
});
