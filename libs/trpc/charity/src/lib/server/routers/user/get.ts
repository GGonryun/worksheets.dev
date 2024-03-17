import { userSchema } from '@worksheets/util/types';

import { protectedProcedure } from '../../procedures';

export default protectedProcedure
  .output(userSchema)
  .query(async ({ ctx: { user } }) => {
    return user;
  });
