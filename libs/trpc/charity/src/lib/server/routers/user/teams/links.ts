import { socialLinksSchema } from '@worksheets/util/types';

import { protectedTeamProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  update: protectedTeamProcedure(['settings:update'])
    .input(socialLinksSchema)
    .mutation(async ({ ctx: { db, team }, input }) => {
      await db.team.update({
        where: { id: team.id },
        data: {
          links: input,
        },
      });
    }),
});
