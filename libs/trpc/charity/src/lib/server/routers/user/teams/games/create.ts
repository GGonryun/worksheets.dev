import { waitFor } from '@worksheets/util/time';
import { createGameFormSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      teamId: z.string(),
      form: createGameFormSchema,
    })
  )
  .output(z.any())
  .mutation(async ({ ctx: { db, user }, input }) => {
    console.log('Creating game based on user input', input);
    await waitFor(1000);
    return true;
  });
