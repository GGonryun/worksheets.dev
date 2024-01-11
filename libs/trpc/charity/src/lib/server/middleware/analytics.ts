import { middleware } from '../trpc';

export const analytics = middleware(async ({ next, ctx }) => {
  const ip: string =
    (ctx.req.headers['x-forwarded-for'] as string) ||
    ctx.req.socket.remoteAddress ||
    '0.0.0.0';

  return next({
    ctx: {
      ip,
    },
  });
});
