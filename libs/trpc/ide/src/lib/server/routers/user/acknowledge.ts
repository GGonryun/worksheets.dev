import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { user } from '@worksheets/feat/user-management';
import { TRPCError } from '@trpc/server';
// acknowledge user everytime they login.
export default protectedProcedure
  .input(z.object({}))
  .output(z.number())
  .mutation(async ({ input, ctx: { user: u } }) => {
    try {
      await user.acknowledge(u, input);
      return 1;
    } catch (error) {
      console.error('[ACK][ERR] failed to acknowledge user', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'TRPC failed to acknowledge user.',
      });
    }
  });
