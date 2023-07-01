import { createOpenApiNextHandler } from 'trpc-openapi';

import { appRouter, createContext } from '@worksheets/trpc/ide/server';
export default createOpenApiNextHandler({
  router: appRouter,
  createContext,
});
