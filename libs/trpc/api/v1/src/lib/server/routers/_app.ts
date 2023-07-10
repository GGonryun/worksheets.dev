import { router } from '../trpc';
import worksheets from './worksheets/router';
import user from './user/router';
import applications from './applications/router';
import connections from './connections/router';
import executions from './executions/router';
import execute from './execute/router';

export const appRouter = router({
  worksheets,
  user,
  applications,
  connections,
  executions,
  execute,
});

export type AppRouter = typeof appRouter;
