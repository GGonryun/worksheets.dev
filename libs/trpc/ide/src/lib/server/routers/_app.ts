import { router } from '../trpc';
import user from './user/router';
import applications from './applications/router';
import method from './method/router';

export const appRouter = router({
  user,
  applications,
  method,
});

export type AppRouter = typeof appRouter;
