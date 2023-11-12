import { router } from '../trpc';
import emails from './emails/router';
import teams from './teams/router';

export const appRouter = router({
  emails,
  teams,
});

export type AppRouter = typeof appRouter;
