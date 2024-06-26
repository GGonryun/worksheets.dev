import { httpBatchLink, httpLink, loggerLink, splitLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';

import { AppRouter } from '../server/routers/_app';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (CHARITY_GAMES_BASE_URL) return CHARITY_GAMES_BASE_URL;

  // assume localhost
  return `http://localhost:6969`;
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      links: [
        splitLink({
          condition(op) {
            const components = op.path.split('.');
            return components?.at(0) === 'public' && op.type === 'query';
          },
          // when condition is true, use normal request
          true: httpLink({
            url,
          }),
          // when condition is false, use batching
          false: httpBatchLink({
            url,
          }),
        }),
        /**
         * The function passed to enabled is an example in case you want to the link to
         * log to your console in development and only log errors in production
         */
        loggerLink({
          enabled: () =>
            process.env.NODE_ENV === 'development' &&
            typeof window !== 'undefined',
        }),
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url,
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  ssr: false,
});
