import { router } from '../trpc';
import emails from './emails/router';
import user from './user/router';
import game from './game/router';

export const appRouter = router({
  emails,
  user,
  game,
});

export type AppRouter = typeof appRouter;
