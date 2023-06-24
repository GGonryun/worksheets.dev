import { router } from '../trpc';
import worksheets from './worksheets/router';
import user from './user/router';
import applications from './applications/router';
import connections from './connections/router';

export const appRouter = router({
  worksheets,
  user,
  applications,
  connections,
});

export type AppRouter = typeof appRouter;
