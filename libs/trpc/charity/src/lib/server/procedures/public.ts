import { user } from '../middleware/user';
import { t } from '../trpc';

export const publicProcedure = t.procedure.use(user);
