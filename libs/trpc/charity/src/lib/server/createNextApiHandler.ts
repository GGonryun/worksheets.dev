import * as trpcNext from '@trpc/server/adapters/next';

import { responseMeta } from './cache';
import { createContext } from './context/context';
import { appRouter } from './routers/_app';

export const createNextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta,
});
