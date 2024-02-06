import { convertPrize, prizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      filter: z.enum(['all', 'active']),
    })
  )
  .output(prizeSchema.array())
  .query(async ({ ctx: { db, user } }) => {
    console.info(`finding all entered raffles for user ${user.id}`);

    const raffleTickets = await db.raffleTicket.findMany({
      where: {
        userId: user.id,
      },
      include: {
        prize: {
          include: {
            sponsor: true,
          },
        },
      },
      distinct: ['prizeId'],
    });

    return raffleTickets.map((ticket) => convertPrize(ticket.prize));
  });
