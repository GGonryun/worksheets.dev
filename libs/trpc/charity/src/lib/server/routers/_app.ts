import { router } from '../trpc';
import newsletterRouter from './newsletter/router';
import publicRouter from './public/router';
import userRouter from './user/router';

export const appRouter = router({
  public: publicRouter,
  user: userRouter,
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
