import { TRPCError } from '@trpc/server';
import { convertPrize, prizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      prizeId: z.string(),
    })
  )
  .output(prizeSchema)
  .query(async ({ input: { prizeId }, ctx: { db } }) => {
    console.info(`finding prize ${prizeId}ssq`);
    const prize = await db.rafflePrize.findFirst({
      where: {
        id: prizeId,
      },
      include: {
        sponsor: true,
      },
    });

    if (!prize)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Prize not found' });

    return convertPrize(prize);
  });
