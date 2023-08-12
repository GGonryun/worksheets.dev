import { router } from '../trpc';
import user from './user/router';
import applications from './applications/router';
import method from './method/router';
import connections from './connections/router';
import services from './services/router';

export const appRouter = router({
  user,
  applications,
  method,
  connections,
  services,
});

export type AppRouter = typeof appRouter;
