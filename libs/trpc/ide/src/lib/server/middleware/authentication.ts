import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';

export const isAuthed = middleware(({ next, ctx, type, path }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Authorization middleware stopped unauthorized user from completing request ${type} - ${path}`,
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
