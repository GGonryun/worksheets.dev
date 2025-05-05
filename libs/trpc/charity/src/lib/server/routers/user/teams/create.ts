import { TRPCError } from '@trpc/server';
import { protectedIds } from '@worksheets/util/team';
import {
  createTeamSchema,
  parseTeam,
  teamSchema,
} from '@worksheets/util/types';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(createTeamSchema)
  .output(teamSchema)
  .mutation(async ({ ctx: { user, db }, input }) => {
    if (protectedIds.includes(input.id)) {
      console.warn('Protected team slug cannot be used', { slug: input.id });
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Team slug is not available',
      });
    }

    const team = await db.team.create({
      data: {
        id: input.id,
        name: input.name,
        description: input.description,
        links: input.links,
        logo: input.logo,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
      },
      include: {
        members: true,
        games: true,
      },
    });

    return parseTeam(team);
  });
