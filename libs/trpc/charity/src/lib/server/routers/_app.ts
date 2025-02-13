import { router } from '../trpc';
import maybe from './maybe/router';
import publicRouter from './public/router';
import user from './user/router';

export const appRouter = router({
  public: publicRouter,
  user,
  maybe,
});

export type AppRouter = typeof appRouter;
