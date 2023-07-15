import { router } from '../trpc';

import reapers from './reapers/router';
import replenishers from './replenishers/router';

export const appRouter = router({
  reapers,
  replenishers,
});

export type AppRouter = typeof appRouter;
