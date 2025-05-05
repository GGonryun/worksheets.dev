import { TRPCError } from '@trpc/server';

import { protectedTeamProcedure } from '../../../procedures';

export default protectedTeamProcedure(['team:delete']).mutation(
  async ({ ctx: { db, team } }) => {
    const members = await db.teamMembership.findMany({
      where: {
        teamId: team.id,
      },
    });

    // only the admin would be left
    if (members.length > 1) {
      console.error('Team has members', team.id);
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Team has members',
      });
    }

    const games = await db.game.findMany({
      where: {
        teamId: team.id,
      },
    });
    if (games.length > 0) {
      console.error('Team has games', team.id);
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Team has games',
      });
    }

    const invites = await db.teamInvite.findMany({
      where: {
        teamId: team.id,
      },
    });
    if (invites.length > 0) {
      console.error('Team has invites', team.id);
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Team has invites',
      });
    }

    // even though we checked for members, we still need to make sure
    // no data is left behind.
    await db.teamMembership.deleteMany({
      where: {
        teamId: team.id,
      },
    });
    await db.teamInvite.deleteMany({
      where: {
        teamId: team.id,
      },
    });
    await db.game.deleteMany({
      where: {
        teamId: team.id,
      },
    });
    await db.team.delete({
      where: {
        id: team.id,
      },
    });

    return { success: true };
  }
);
