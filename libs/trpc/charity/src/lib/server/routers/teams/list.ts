import { GameModel, MembershipModel, TeamModel } from '@worksheets/prisma';
import { protectedProcedure } from '../../procedures/protected';
import { z } from 'zod';

export default protectedProcedure
  .output(
    z.array(
      TeamModel.pick({
        id: true,
        name: true,
        subdomain: true,
        description: true,
        image: true,
        logo: true,
      }).merge(
        z.object({
          games: z.array(GameModel),
          memberships: z.array(MembershipModel),
        })
      )
    )
  )
  .query(async ({ ctx: { user, db } }) => {
    const teams = await db.team.findMany({
      select: {
        id: true,
        name: true,
        subdomain: true,
        description: true,
        image: true,
        logo: true,
        games: true,
        memberships: true,
      },
      where: {
        memberships: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    return teams;
  });
