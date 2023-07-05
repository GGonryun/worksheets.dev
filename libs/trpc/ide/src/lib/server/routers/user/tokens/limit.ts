import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { user } from '@worksheets/feat/user-management';
import { TRPCError } from '@trpc/server';

export default protectedProcedure
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
