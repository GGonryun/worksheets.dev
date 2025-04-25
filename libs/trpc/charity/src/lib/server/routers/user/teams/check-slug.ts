import { protectedTeamSlugs } from '@worksheets/util/team';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(z.object({ slug: z.string() }))
  .output(
    z.object({
      exists: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { db }, input: { slug } }) => {
    const team = await db.team.count({
      where: {
        slug,
      },
    });

    if (protectedTeamSlugs.includes(slug)) {
      console.warn('Protected team slug cannot be used', { slug });
      return {
        exists: true,
      };
    }

    return {
      exists: !!team,
    };
  });
