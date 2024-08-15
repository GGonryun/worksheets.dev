import { TRPCError } from '@trpc/server';
import { prisma } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { MobsService } from '@worksheets/services/mobs';
import { NotificationsService } from '@worksheets/services/notifications';
import { TasksService } from '@worksheets/services/tasks';
import { createBackgroundJob } from '@worksheets/util/jobs';
import { retryTransaction } from '@worksheets/util/prisma';

export default createBackgroundJob(async (path, body, _req, res) => {
  console.info('Executing job', path, body);

  const job = path.join('/');

  if (job === 'raffle/participation') {
    const tasks = new TasksService(prisma);
    const { userId, repetitions, referralCode, raffleId } = body;

    await tasks.trackQuest({
      questId: 'RAFFLE_PARTICIPATION_DAILY',
      userId,
      repetitions,
    });

    if (referralCode) {
      await tasks.trackReferralAction({
        userId,
        raffleId,
        referralCode,
      });
    }
    return true;
  } else if (job === 'battle/participation') {
    const tasks = new TasksService(prisma);
    const { userId, damage } = body;

    await tasks.trackQuest({
      questId: 'BATTLE_PARTICIPATION_DAILY',
      userId,
      repetitions: damage,
    });

    return true;
  } else if (job === 'leaderboard/score') {
    const tasks = new TasksService(prisma);
    await tasks.trackLeaderboardAction(body);
  } else if (job === 'battle/completed') {
    const { mvp, battle, loot, spawned } = await retryTransaction(
      prisma,
      async (tx) => {
        const mobs = new MobsService(tx);
        return mobs.processCompletedBattle(body.battleId);
      }
    );
    const notifications = new NotificationsService(prisma);
    await notifications.send('battle-mvp-awarded', {
      userId: mvp.participant.user.id,
      battle,
      loot,
    });
    await notifications.send('battle-completed', {
      userIds: battle.participation
        .map((p) => p.user.id)
        .filter((id) => id !== mvp.participant.user.id),
      battle,
    });
    await res.revalidate(
      routes.battle.path({
        params: {
          battleId: spawned.battleId,
        },
      })
    );
  } else {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Job does not exist',
    });
  }
});
