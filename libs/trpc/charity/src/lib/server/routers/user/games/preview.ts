import { findGame } from '@worksheets/util/games';
import { SerializableGameSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
      version: z.string(),
    })
  )
  .output(z.custom<SerializableGameSchema>())
  .query(async ({ input: { id, version }, ctx: { db, user } }) => {
    return findGame(db, {
      id,
      version,
      accessCheck: (game) => {
        return game.team.members.some((m) => m.userId === user.id);
      },
    });
  });
