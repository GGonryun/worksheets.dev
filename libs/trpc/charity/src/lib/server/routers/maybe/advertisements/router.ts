import { AdvertisementService } from '@worksheets/services/advertisement';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  get: publicProcedure
    .output(z.custom<Awaited<ReturnType<AdvertisementService['get']>>>())
    .query(async () => {
      const advertisements = new AdvertisementService();
      return await advertisements.get();
    }),
  click: publicProcedure
    .input(z.custom<Parameters<AdvertisementService['click']>[0]>())
    .output(z.custom<Awaited<ReturnType<AdvertisementService['click']>>>())
    .mutation(async ({ input }) => {
      const advertisements = new AdvertisementService();
      return await advertisements.click(input);
    }),
});
