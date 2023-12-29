import { router } from '../trpc';
import emails from './emails/router';
import game from './game/router';

export const appRouter = router({
  emails,
  game,
});

export type AppRouter = typeof appRouter;
