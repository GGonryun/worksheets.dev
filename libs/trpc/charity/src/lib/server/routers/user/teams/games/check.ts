import { protectedIds } from '@worksheets/util/team';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .input(z.object({ id: z.string() }))
  .output(
    z.object({
      exists: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { db }, input: { id } }) => {
    if (protectedIds.includes(id)) {
      console.warn('Protected team id cannot be used', { id });
      return {
        exists: true,
      };
    }

    const game = await db.game.count({
      where: {
        id,
      },
    });

    return {
      exists: !!game,
    };
  });
