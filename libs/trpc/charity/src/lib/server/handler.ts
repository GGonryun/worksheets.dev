import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createContext } from '@worksheets/trpc/shared';

import { responseMeta } from './cache';
import { appRouter } from './routers/_app';

export const createAppHandler = createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta,
});
