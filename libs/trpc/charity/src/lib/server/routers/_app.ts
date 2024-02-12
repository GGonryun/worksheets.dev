import { router } from '../trpc';
import admin from './admin/router';
import arcade from './arcade/router';
import categories from './categories/router';
import developers from './developers/router';
import game from './game/router';
import prizes from './prizes/router';
import raffles from './raffles/router';
import usage from './usage/router';
import user from './user/router';

export const appRouter = router({
  admin,
  game,
  raffles,
  user,
  arcade,
  developers,
  usage,
  categories,
  prizes,
});

export type AppRouter = typeof appRouter;
