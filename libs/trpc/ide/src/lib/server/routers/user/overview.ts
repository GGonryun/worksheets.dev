import { user } from '@worksheets/feat/user-management';
import {
  userOverviewRequestSchema,
  userOverviewSchema,
} from '@worksheets/schemas-user';
import { privateProcedure } from '../../procedures';

export default privateProcedure
  .input(userOverviewRequestSchema)
  .output(userOverviewSchema)
  .query(async ({ input, ctx: { user: u } }) => {
    if (input?.acknowledge) await user.acknowledge(u);
    return await user.overview(u);
  });
