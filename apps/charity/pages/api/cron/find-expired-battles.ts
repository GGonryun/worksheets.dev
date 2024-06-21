import { prisma } from '@worksheets/prisma';
import { MobsService } from '@worksheets/services/mobs';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';
import { retryTransaction } from '@worksheets/util/prisma';
import { S_TO_MS } from '@worksheets/util/time';
import { MVP_EXTENDED_REASON_LABEL } from '@worksheets/util/types';

export default createCronJob(async () => {
  const mobs = new MobsService(prisma);
  const expired = await mobs.findExpiredBattles();

  for (const exp of expired) {
    console.info('Begin processing expired battle:', exp.id);
    await processExpiredBattle(exp);
  }
});

export const processExpiredBattle = async (
  battle: Awaited<ReturnType<MobsService['findExpiredBattles']>>[number]
) => {
  const result = await retryTransaction(
    prisma,
    async (tx) => {
      const txm = new MobsService(tx);
      return txm.processExpiredBattle(battle);
    },
    {
      maxAttempts: 5,
      maxWait: S_TO_MS(30),
      timeout: S_TO_MS(180),
    }
  );
  const notifications = new NotificationsService(prisma);

  const mob = {
    name: result.battle.mob.name,
    battleId: result.battle.id,
    loot: result.battle.mob.loot.reduce((a, l) => a + l.quantity, 0),
  };

  await Promise.allSettled([
    notifications.send('battle-completed', {
      mvp: result.mvp.participant.user.username,
      userIds: result.losers.map((w) => w.user.id),
      mob,
    }),
    notifications.send('battle-mvp-awarded', {
      userId: result.mvp.participant.user.id,
      mob,
    }),
    notifications.send('battle-loot-awarded', {
      userIds: result.winners.map((w) => w.user.id),
      mob,
    }),
    retryTransaction(prisma, async (tx) => {
      console.info('Creating end result battle logs');
      await tx.battleLogs.createMany({
        data: [
          {
            battleId: result.battle.id,
            message: `The battle against ${result.battle.mob.name} has ended!`,
          },
          {
            battleId: result.battle.id,
            message: `The MVP is ${result.mvp.participant.user.username} for ${
              MVP_EXTENDED_REASON_LABEL[result.mvp.reason]
            }!`,
          },
        ],
      });
    }),
    retryTransaction(prisma, async (tx) => {
      console.info('Updating user experience', result.exp);
      for (const [userId, points] of Object.entries(result.exp)) {
        await tx.userExperience.upsert({
          where: {
            userId,
          },
          create: {
            userId,
            points,
          },
          update: {
            points: {
              increment: points,
            },
          },
        });
      }
    }),
  ]);
};
