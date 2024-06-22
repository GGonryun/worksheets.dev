import { ratelimiter } from '../middleware/ratelimit';
import { t } from '../trpc';

export const publicProcedure = t.procedure.use(ratelimiter);
