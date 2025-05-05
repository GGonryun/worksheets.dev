import { TRPCError } from '@trpc/server';
import { parseTeam, teamSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(teamSchema)
  .query(async ({ ctx: { db }, input: where }) => {
    const team = await db.team.findUnique({
      where,
      include: {
        members: true,
        games: true,
      },
    });

    if (!team) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Team with id ${where.id} not found`,
      });
    }

    return parseTeam(team);
  });
