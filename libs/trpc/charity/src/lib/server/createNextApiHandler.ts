import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from './context/context';
import { appRouter } from './routers/_app';

export const createNextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
