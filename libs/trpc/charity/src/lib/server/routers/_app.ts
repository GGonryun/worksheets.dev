import { router } from '../trpc';
import arcade from './arcade/router';
import donations from './donations/router';
import game from './game/router';
import prizes from './prizes/router';
import usage from './usage/router';
import user from './user/router';

export const appRouter = router({
  game,
  prizes,
  usage,
  user,
  arcade,
  donations,
});

export type AppRouter = typeof appRouter;
