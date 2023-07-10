import { z } from 'zod';
import { quotas } from '@worksheets/feat/user-management';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(
    z.object({
      overclock: z.boolean(),
    })
  )
  .output(z.boolean())
  .mutation(async ({ input, ctx: { user } }) => {
    await quotas.update(user.uid, input);

    return true;
  });
