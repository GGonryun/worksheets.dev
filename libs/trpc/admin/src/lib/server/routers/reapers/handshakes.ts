import { z } from 'zod';
import { publicProcedure } from '../../procedures';
import { reapHandshakes } from '@worksheets/feat/app-connections';

export default publicProcedure
  .meta({
    openapi: {
      enabled: true,
      method: 'DELETE',
      path: '/reapers/handshakes',
      summary: 'Clean up old handshakes on the system',
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
    return await reapHandshakes(input?.quantity);
  });
