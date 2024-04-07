import { router } from '../trpc';
import adminRouter from './admin/router';
import newsletterRouter from './newsletter/router';
import publicRouter from './public/router';
import userRouter from './user/router';

export const appRouter = router({
  admin: adminRouter,
  public: publicRouter,
  user: userRouter,
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
