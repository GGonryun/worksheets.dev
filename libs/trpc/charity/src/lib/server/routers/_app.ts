import { router } from '../trpc';
import game from './game/router';
import usage from './usage/router';
import user from './user/router';

export const appRouter = router({
  game,
  usage,
  user,
});

export type AppRouter = typeof appRouter;
