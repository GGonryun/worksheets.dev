import { TRPCError } from '@trpc/server';

import { middleware } from '../trpc';

export const authentication = middleware(async ({ next, ctx, type, path }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Authorization middleware stopped unauthorized user from completing request ${type} - ${path}`,
    });
  }

  const user = await ctx.db.user.findFirst({
    where: {
      id: ctx.session.user.id,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: `UNAUTHORIZED`,
      message: `Authorization middleware stopped request (${type} - ${path}) because user was not found in database`,
    });
  }

  return next({
    ctx: {
      user,
    },
  });
});
