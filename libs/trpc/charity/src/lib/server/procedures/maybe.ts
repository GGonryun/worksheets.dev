import { maybeAuth } from '../middleware/maybeAuth';
import { t } from '../trpc';

export const maybeProcedure = t.procedure.use(maybeAuth);
