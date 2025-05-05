import { TRPCError } from '@trpc/server';
import { MAX_TEAM_MEMBERSHIP } from '@worksheets/util/settings';
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

    const count = await db.teamMembership.count({
      where: {
        userId: user.id,
      },
    });
    if (count >= MAX_TEAM_MEMBERSHIP) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message:
          'You cannot belong to more than 5 teams. Leave a team or ask an admin to remove you from a team.',
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
