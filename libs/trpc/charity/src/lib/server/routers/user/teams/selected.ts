import { socialLinksSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../procedures';

export default protectedTeamProcedure(['team:read'])
  .output(
    z.object({
      id: z.string(),
      description: z.string(),
      name: z.string(),
      logo: z.string(),
      links: socialLinksSchema,
    })
  )
  .query(async ({ ctx: { team } }) => {
    return {
      ...team,
      links: socialLinksSchema.parse(team.links),
    };
  });
