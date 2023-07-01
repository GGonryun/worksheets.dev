import { createOpenApiNextHandler } from 'trpc-openapi';

import { appRouter, createContext } from '@worksheets/trpc/ide/server';
export default createOpenApiNextHandler({
  router: appRouter,
  createContext,
  responseMeta: (opts) => ({
    headers: {
      'x-trpc-length': opts.data ? String(opts.data.length) : '0',
      'x-trpc-error': opts.errors.length ? '1' : '0',
      'x-trpc-http-version': '1.1',
      'x-trpc-request-type': opts.type,
      'x-trpc-content-type': 'application/json',
      'x-trpc-user-request': opts.ctx?.user ? '1' : '0',
    },
  }),
});
