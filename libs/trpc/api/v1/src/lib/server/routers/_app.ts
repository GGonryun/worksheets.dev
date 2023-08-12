import { router } from '../trpc';
import user from './user/router';
import call from './call/router';
import services from './services/router';

export const appRouter = router({
  user,
  call,
  services,
});

export type AppRouter = typeof appRouter;
