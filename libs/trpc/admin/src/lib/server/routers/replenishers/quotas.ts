import { z } from 'zod';
import { publicProcedure } from '../../procedures';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { replenishUserQuotas } from '@worksheets/feat/user-management';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'POST',
      path: '/replenishers/quotas',
      summary: 'Replenish user quotas',
      tags: ['replenishers'],
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
    return await replenishUserQuotas(
      input?.quantity ?? SERVER_SETTINGS.REAPER.QUANTITIES.EXECUTIONS
    );
  });
