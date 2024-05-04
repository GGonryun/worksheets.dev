import { TRPCError } from '@trpc/server';
import {
  MAX_AD_RAFFLE_USES,
  RAFFLE_ENTRIES_PER_AD,
} from '@worksheets/util/settings';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';
import entered from './entered';
import enterRaffle from './enterRaffle';
import participation from './participation';

export default t.router({
  entered,
  participation,
  enterRaffle,
  bonusEntry: protectedProcedure
    .input(
      z.object({
        raffleId: z.number(),
      })
    )
    .mutation(async ({ input: { raffleId }, ctx: { user, db } }) => {
      await db.$transaction(async (tx) => {
        const raffle = await tx.raffle.findFirst({
          where: {
            id: raffleId,
          },
        });

        if (!raffle) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Raffle not found',
          });
        }

        if (raffle.status !== 'ACTIVE') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Raffle is not active',
          });
        }

        let participation = await tx.raffleParticipation.findFirst({
          where: {
            userId: user.id,
            raffleId,
          },
        });

        if (!participation) {
          participation = await tx.raffleParticipation.create({
            data: {
              userId: user.id,
              raffleId,
              numEntries: RAFFLE_ENTRIES_PER_AD,
              adsWatched: 1,
            },
          });
        } else {
          participation = await tx.raffleParticipation.update({
            where: {
              id: participation.id,
            },
            data: {
              numEntries: {
                increment: RAFFLE_ENTRIES_PER_AD,
              },
              adsWatched: {
                increment: 1,
              },
            },
          });
        }

        if (participation.adsWatched > MAX_AD_RAFFLE_USES) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message:
              'You have already watched the maximum number of ads for this raffle',
          });
        }
      });
    }),
});
