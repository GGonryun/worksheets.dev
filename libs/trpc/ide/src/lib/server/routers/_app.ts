import { router } from '../trpc';
import user from './user/router';
import applications from './applications/router';
import method from './method/router';
import connections from './connections/router';
import services from './services/router';
import projects from './projects/router';
import logging from './logging/router';
import vault from './vault/router';
import contact from './contact/router';

export const appRouter = router({
  user,
  applications,
  method,
  connections,
  services,
  projects,
  logging,
  vault,
  contact,
});

export type AppRouter = typeof appRouter;
