import { router } from '../trpc';
import user from './user/router';
import applications from './applications/router';
import method from './method/router';
import connections from './connections/router';

export const appRouter = router({
  user,
  applications,
  method,
  connections,
});

export type AppRouter = typeof appRouter;
