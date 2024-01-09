import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z
      .object({
        id: z.string(),
        status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
        createdAt: z.date(),
        updatedAt: z.date(),
        ownerId: z.string(),
        gameId: z.string(),
        slug: z.string(),
      })
      .array()
  )
  .query(async ({ ctx: { db } }) => {
    console.info('TODO: list submissions');
    return [];
  });
