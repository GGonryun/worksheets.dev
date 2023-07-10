import { router } from '../trpc';

import reapers from './reapers/router';
import executions from './executions/router';

export const appRouter = router({
  reapers,
  executions,
});

export type AppRouter = typeof appRouter;
