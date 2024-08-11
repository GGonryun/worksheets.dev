import { NotificationsService } from '@worksheets/services/notifications';
import { PrizeService } from '@worksheets/services/prizes';
import { retryTransaction } from '@worksheets/util/prisma';
import { purchaseResultSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  purchase: protectedProcedure
    .input(
      z.object({
        prizeId: z.number(),
      })
    )
    .output(purchaseResultSchema)
    .mutation(async ({ input: { prizeId }, ctx: { db, user } }) => {
      const result = await retryTransaction(db, async (tx) => {
        const service = new PrizeService(tx);
        return service.unlock(prizeId, user);
      });

      const notifications = new NotificationsService(db);
      await notifications.send('prize-purchased', result);

      return result;
    }),
});
