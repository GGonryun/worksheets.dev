import { router } from '../trpc';
import emails from './emails/router';
import game from './game/router';
import usage from './usage/router';

export const appRouter = router({
  emails,
  game,
  usage,
});

export type AppRouter = typeof appRouter;
