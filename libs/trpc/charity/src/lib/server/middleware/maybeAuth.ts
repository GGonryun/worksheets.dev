import { User } from '@prisma/client';

import { middleware } from '../trpc';

export const maybeAuth = middleware(async ({ next, ctx }) => {
  if (!ctx.session || !ctx.session.user) {
    return next({
      ctx: {
        user: null as User | null,
      },
    });
  } else {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });

    return next({
      ctx: {
        user,
      },
    });
  }
});
