import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';

export const isAuthed = middleware(({ next, ctx, type, path }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `You must be logged in to access ${type} ${path}`,
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
