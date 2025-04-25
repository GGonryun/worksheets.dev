import { TRPCError } from '@trpc/server';
import { protectedTeamSlugs } from '@worksheets/util/team';
import { createTeamSchema, teamSchema } from '@worksheets/util/types';

import { protectedProcedure } from '../../../procedures';
import { parseTeam } from './shared';

export default protectedProcedure
  .input(createTeamSchema)
  .output(teamSchema)
  .mutation(async ({ ctx: { user, db }, input }) => {
    const data = {
      name: input.name,
      description: input.description,
      links: input.links,
      logo: input.logo,
      slug: input.slug,
    };

    if (protectedTeamSlugs.includes(input.slug)) {
      console.warn('Protected team slug cannot be used', { slug: input.slug });
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Team slug is not available',
      });
    }

    const team = await db.team.create({
      data: {
        ...data,
        members: {
          create: {
            userId: user.id,
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
