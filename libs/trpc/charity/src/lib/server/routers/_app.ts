import { router } from '../trpc';
import emails from './emails/router';
import game from './game/router';
import games from './games/router';
import usage from './usage/router';
import files from './files/router';
import profile from './profile/router';

export const appRouter = router({
  emails,
  game,
  usage,
  games,
  files,
  profile,
});

export type AppRouter = typeof appRouter;
