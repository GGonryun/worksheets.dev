import { router } from '../trpc';
import worksheets from './worksheets/router';
import user from './user/router';
import applications from './applications/router';
import connections from './connections/router';
import templates from './templates/router';
import executions from './executions/router';

export const appRouter = router({
  worksheets,
  user,
  applications,
  connections,
  templates,
  executions,
});

export type AppRouter = typeof appRouter;
