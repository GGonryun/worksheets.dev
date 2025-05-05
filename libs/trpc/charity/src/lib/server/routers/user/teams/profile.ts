import { editProfileFormSchema } from '@worksheets/util/types';

import { protectedTeamProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  update: protectedTeamProcedure(['settings:update'])
    .input(editProfileFormSchema)
    .mutation(async ({ ctx: { db, team }, input }) => {
      await db.team.update({
        where: {
          id: team.id,
        },
        data: {
          name: input.name,
          description: input.description,
          logo: input.logo,
        },
      });
    }),
});
