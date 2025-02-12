import { RafflesService } from '@worksheets/services/raffles';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      raffleId: z.number(),
      entries: z.number(),
      referralCode: z.string().optional(),
    })
  )
  .output(z.unknown())
  .mutation(
    async ({
      input: { referralCode, raffleId, entries },
      ctx: { db, user },
    }) => {
      console.info('A user is entering a raffle', {
        raffleId,
        entries,
        userId: user.id,
      });

      await db.$transaction(async (tx) => {
        const raffles = new RafflesService(tx);
        await raffles.addEntries({
          userId: user.id,
          raffleId,
          entries,
          bonus: false,
        });
      });
    }
  );
