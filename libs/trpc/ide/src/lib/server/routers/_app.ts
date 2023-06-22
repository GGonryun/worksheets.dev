import { router } from '../trpc';
import worksheets from './worksheets/router';
import user from './user/router';

export const appRouter = router({
  worksheets,
  user,
});

export type AppRouter = typeof appRouter;
