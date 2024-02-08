import { convertRaffle, raffleSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      filter: z.enum(['all', 'active']),
    })
  )
  .output(raffleSchema.array())
  .query(async ({ ctx: { db, user } }) => {
    console.info(`finding all entered raffles for user ${user.id}`);

    const raffleTickets = await db.raffleTicket.findMany({
      where: {
        userId: user.id,
      },
      include: {
        raffle: {
          include: {
            sponsor: true,
            prize: true,
          },
        },
      },
    });

    return raffleTickets.map((ticket) => convertRaffle(ticket.raffle));
  });
