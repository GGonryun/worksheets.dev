import { socialLinksSchema, teamSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z
      .object({
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
      team: {
        id: invite.team.id,
        name: invite.team.name,
        logo: invite.team.logo,
        description: invite.team.description,
        members: invite.team.members.length,
        games: invite.team.games.length,
        links: socialLinksSchema.parse(invite.team.links),
      },
    }));
  });
