import { router } from '../trpc';
import user from './user/router';
import call from './call/router';

export const appRouter = router({
  user,
  call,
});

export type AppRouter = typeof appRouter;
