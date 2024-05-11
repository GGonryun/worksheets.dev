import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';
import find from './find';
import list from './list';

export default t.router({
  find,
  list,
  soonest: t.router({
    expiration: publicProcedure
      .output(z.number().nullable())
      .query(async ({ ctx: { db } }) => {
        console.info('searching for soonest expiring raffle');
        const latest = await db.raffle.findFirst({
          where: {
            status: 'ACTIVE',
            expiresAt: {
              gt: new Date(),
            },
          },
          orderBy: {
            expiresAt: 'asc',
          },
        });

        if (!latest) {
          console.info('no raffles found');
          return null;
        }

        console.info(
          `soonest expiring raffle: ${latest.id}, expires at: ${latest.expiresAt}`
        );
        return latest.expiresAt.getTime();
      }),
  }),
});
