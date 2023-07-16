import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';

export const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `You must be logged in to perform this action`,
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
