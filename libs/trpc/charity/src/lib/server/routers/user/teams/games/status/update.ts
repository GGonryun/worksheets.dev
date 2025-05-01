import { TRPCError } from '@trpc/server';
import { NotificationsService } from '@worksheets/services/notifications';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';

export default protectedTeamProcedure(['games:update', 'games:read'])
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, team }, input }) => {
    const game = await db.game.findFirst({
      where: {
        id: input.gameId,
        teamId: team.id,
      },
    });

    if (!game) {
      console.error(
        'Game does not exist or does not belong to the team or the user is not a member of the team',
        input
      );
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }

    if (game.status !== 'DRAFT') {
      console.error('Game status cannot be changed if it is not draft', input);
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Game is not in draft status',
      });
    }

    await db.game.update({
      where: {
        id: input.gameId,
      },
      data: {
        status: 'PENDING',
      },
    });

    const notifications = new NotificationsService();
    await notifications.send('game-submission', {
      game,
      team,
    });
  });
