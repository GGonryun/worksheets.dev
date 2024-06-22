import { authentication } from '../middleware/authentication';
import { ratelimiter } from '../middleware/ratelimit';
import { t } from '../trpc';

export const protectedProcedure = t.procedure
  .use(authentication)
  .use(ratelimiter);
