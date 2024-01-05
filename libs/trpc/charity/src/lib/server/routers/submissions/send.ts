import { SubmitGameFormSchema } from '@worksheets/util/types';
import { protectedProcedure } from '../../procedures';
import { z } from '@worksheets/zod';

export default protectedProcedure
  .input(SubmitGameFormSchema)
  .output(z.object({ okay: z.boolean() }))
  .mutation(async ({ input, ctx: { db, user } }) => {
    // TODO: Implement
    console.log('received game form from user', input, user);
    return { okay: true };
  });
