import { TRPCError } from '@trpc/server';
import { prisma } from '@worksheets/prisma';
import { TasksService } from '@worksheets/services/tasks';
import { createBackgroundJob } from '@worksheets/util/jobs';

export default createBackgroundJob(async (path, body) => {
  console.info('Executing job', path, body);

  const job = path.join('/');

  if (job === 'track/play/game') {
    const tasks = new TasksService(prisma);
    const { gameId, userId } = body;
    await tasks.trackGameQuests({
      gameId,
      userId,
      type: 'PLAY_GAME',
      repetitions: 1,
    });
    await tasks.trackGameActions({
      gameId,
      userId,
      type: 'PLAY_GAME',
      repetitions: 1,
    });
    return true;
  } else if (job === 'raffle/participation') {
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
  } else {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Job does not exist',
    });
  }
});
