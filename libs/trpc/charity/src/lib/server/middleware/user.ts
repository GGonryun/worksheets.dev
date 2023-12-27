import { middleware } from '../trpc';

export const user = middleware(({ next, ctx, type, path }) => {
  return next({
    ctx: {
      user: ctx?.session?.user,
    },
  });
});
