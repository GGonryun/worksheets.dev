import { analytics } from '../middleware/analytics';
import { maybeAuth } from '../middleware/maybeAuth';
import { t } from '../trpc';

export const publicProcedure = t.procedure.use(analytics);
