import { TRPCError } from '@trpc/server';
import ratelimit from '@worksheets/services/ratelimit';

import { middleware } from '../trpc';

export const ratelimiter = middleware(async ({ next, ctx, type, path }) => {
  const ip =
    ctx.req?.headers['x-real-ip'] ?? ctx.req?.headers['x-forwarded-for'];

  if (ip) {
    if (typeof ip === 'string') {
      const { success } = await ratelimit.api.limit(ip);
      if (!success) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: 'Rate limit exceeded',
          cause: {
            ip,
            path,
            type,
          },
        });
      }
    } else {
      console.error('Invalid IP format for ratelimit', ip);
    }
  }

  return next();
});
