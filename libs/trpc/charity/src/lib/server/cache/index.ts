import { ResponseMetaFn } from '@trpc/server/dist/http/internals/types';

import { appRouter } from '../routers/_app';

// Implementation of basic caching for public routes
// https://trpc.io/docs/server/caching
export const responseMeta: ResponseMetaFn<typeof appRouter> = (opts) => {
  const { ctx, paths, errors, type } = opts;
  console.log('path', paths);
  // assuming you have all your public routes with the keyword `public` in them
  const allPublic = paths && paths.every((path) => path.includes('public'));
  // checking that no procedures errored
  const allOk = errors.length === 0;
  // checking we're doing a query request
  const isQuery = type === 'query';
  if (ctx?.res && allPublic && allOk && isQuery) {
    // cache request for one day + revalidate once every minute
    const ONE_MINUTE_IN_SECONDS = 60 * 5;
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      headers: {
        'cache-control': `s-maxage=${ONE_MINUTE_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
      },
    };
  }
  return {};
};