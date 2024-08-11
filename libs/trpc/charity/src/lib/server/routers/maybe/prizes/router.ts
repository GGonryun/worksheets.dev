import { PrizeService } from '@worksheets/services/prizes';
import { prizeHistorySchema, prizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  list: publicProcedure
    .output(z.array(prizeSchema))
    .query(async ({ ctx: { db } }) => {
      const service = new PrizeService(db);
      return service.getActive();
    }),
  history: publicProcedure
    .output(z.array(prizeHistorySchema))
    .query(async ({ ctx: { db } }) => {
      const service = new PrizeService(db);
      return service.getHistory();
    }),
});
