import { authentication } from '../middleware/authentication';
import { t } from '../trpc';

export const protectedProcedure = t.procedure.use(authentication);
