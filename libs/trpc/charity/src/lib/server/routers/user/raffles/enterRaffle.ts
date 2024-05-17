import { RafflesService } from '@worksheets/services/raffles';
import { TasksService } from '@worksheets/services/tasks';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      raffleId: z.number(),
      entries: z.number(),
    })
  )
  .output(z.unknown())
  .mutation(async ({ input: { raffleId, entries }, ctx: { db, user } }) => {
    console.info('A user is entering a raffle', {
      raffleId,
      entries,
      userId: user.id,
    });
    const tasks = new TasksService(db);

    await db.$transaction(async (tx) => {
      const raffles = new RafflesService(tx);
      await raffles.addEntries({
        userId: user.id,
        raffleId,
        entries,
        bonus: false,
      });
    });

    await tasks.trackQuest({
      questId: 'RAFFLE_PARTICIPATION_DAILY',
      userId: user.id,
      repetitions: entries,
    });
  });
