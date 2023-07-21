import { router } from '../trpc';
import user from './user/router';
import applications from './applications/router';
import call from './call/router';

export const appRouter = router({
  user,
  applications,
  call,
});

export type AppRouter = typeof appRouter;
