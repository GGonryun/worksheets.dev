import { socialLinksSchema, teamSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z
      .object({
        code: z.string(),
        team: teamSchema,
      })
      .array()
  )
  .query(async ({ ctx: { db, user } }) => {
    const teamInvites = await db.teamInvite.findMany({
      where: {
        email: user.email,
      },
      include: {
        team: {
          include: {
            games: true,
            members: true,
          },
        },
      },
    });

    return teamInvites.map((invite) => ({
      code: invite.code,
      team: {
        id: invite.team.id,
        slug: invite.team.slug,
        name: invite.team.name,
        logo: invite.team.logo,
        description: invite.team.description,
        members: invite.team.members.length,
        games: invite.team.games.length,
        links: socialLinksSchema.parse(invite.team.links),
      },
    }));
  });
