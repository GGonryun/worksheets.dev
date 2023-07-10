import { z } from 'zod';
import { user } from '@worksheets/feat/user-management';
import { TRPCError } from '@trpc/server';
import { privateProcedure } from '../../../procedures';

export default privateProcedure
  .output(z.number())
  .query(async ({ ctx: { user: u } }) => {
    const overview = await user.overview(u);

    const tokenLimit = overview?.limits.tokens;
    if (tokenLimit == null) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Server could not find your token limit',
      });
    }
    return tokenLimit;
  });
