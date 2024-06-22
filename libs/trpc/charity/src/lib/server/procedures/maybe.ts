import { maybeAuth } from '../middleware/maybeAuth';
import { ratelimiter } from '../middleware/ratelimit';
import { t } from '../trpc';

export const maybeProcedure = t.procedure.use(maybeAuth).use(ratelimiter);
