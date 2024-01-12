import { router } from '../trpc';
import emails from './emails/router';
import game from './game/router';
import profile from './profile/router';
import usage from './usage/router';

export const appRouter = router({
  emails,
  game,
  usage,
  profile,
});

export type AppRouter = typeof appRouter;
