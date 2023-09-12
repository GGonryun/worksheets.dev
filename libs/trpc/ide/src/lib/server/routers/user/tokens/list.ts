import { tokens } from '@worksheets/feat/user-management';
import { privateProcedure } from '../../../procedures';
import { listUserTokensResponseSchema } from '@worksheets/schemas-user';

export default privateProcedure.output(listUserTokensResponseSchema).query(
  async ({
    ctx: {
      user: { uid },
    },
  }) => {
    return await tokens.list({
      uid,
    });
  }
);
