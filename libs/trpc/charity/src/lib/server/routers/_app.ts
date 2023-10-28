import { router } from '../trpc';
import emails from './emails/router';

export const appRouter = router({
  emails,
});

export type AppRouter = typeof appRouter;
