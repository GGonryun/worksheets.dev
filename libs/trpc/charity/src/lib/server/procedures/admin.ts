import { TRPCError } from '@trpc/server';

import { authentication } from '../middleware/authentication';
import { t } from '../trpc';

export const adminProcedure = t.procedure.use(authentication).use((opts) => {
  if (!opts.ctx.user || opts.ctx.user.type !== 'ADMIN') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Administrators Only middleware stopped unauthorized user from completing request ${opts.type} - ${opts.path}`,
    });
  }

  return opts.next();
});
