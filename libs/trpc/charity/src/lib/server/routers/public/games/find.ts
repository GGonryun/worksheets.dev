import { findGame } from '@worksheets/util/games';
import { SerializableGameSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(z.custom<SerializableGameSchema>())
  .query(async ({ input: { id }, ctx: { db } }) => {
    return findGame(db, { id });
  });
