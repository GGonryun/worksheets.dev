import { analytics } from '../middleware/analytics';
import { t } from '../trpc';

export const publicProcedure = t.procedure.use(analytics);
