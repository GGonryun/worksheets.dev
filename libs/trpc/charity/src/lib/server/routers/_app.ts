import { router } from '../trpc';
import emails from './emails/router';
import game from './game/router';
import usage from './usage/router';
import submissions from './submissions/router';
import files from './files/router';

export const appRouter = router({
  emails,
  game,
  usage,
  submissions,
  files,
});

export type AppRouter = typeof appRouter;
