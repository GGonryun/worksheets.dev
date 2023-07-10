import { monitor } from '../middleware';
import { t } from '../trpc';

export const publicProcedure = t.procedure.use(monitor);
