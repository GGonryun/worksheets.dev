import { z } from '@worksheets/zod';
import { user } from '@worksheets/feat/user-management';
import { userOverviewSchema } from '@worksheets/schemas-user';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(
    z
      .object({
        acknowledge: z.boolean().optional(),
      })
      .optional()
  )
  .output(userOverviewSchema)
  .query(async ({ input, ctx: { user: u } }) => {
    if (input?.acknowledge) await user.acknowledge(u);
    return await user.overview(u);
  });
