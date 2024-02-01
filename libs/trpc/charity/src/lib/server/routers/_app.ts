import { router } from '../trpc';
import arcade from './arcade/router';
import categories from './categories/router';
import developers from './developers/router';
import game from './game/router';
import prizes from './prizes/router';
import usage from './usage/router';
import user from './user/router';

export const appRouter = router({
  game,
  prizes,
  user,
  arcade,
  developers,
  usage,
  categories,
});

export type AppRouter = typeof appRouter;
