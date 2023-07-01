import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter, createContext } from '@worksheets/trpc/ide/server';
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
