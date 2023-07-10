import { limits } from '@worksheets/feat/server-management';
import { z } from 'zod';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'DELETE',
      path: '/reapers/limits',
      summary: 'Reap rate limits and quotas',
      description: 'Reap rate limits and quotas that have expired',
      tags: ['reapers'],
    },
  })
  .input(
    z
      .object({
        quantity: z.number().optional(),
      })
      .optional()
  )
  .output(z.number())
  .mutation(async ({ input }) => {
    return await limits.reap(input?.quantity);
  });
