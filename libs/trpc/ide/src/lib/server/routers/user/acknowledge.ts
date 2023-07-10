import { z } from 'zod';
import { user } from '@worksheets/feat/user-management';
import { TRPCError } from '@trpc/server';
import { privateProcedure } from '../../procedures';

export default privateProcedure
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
