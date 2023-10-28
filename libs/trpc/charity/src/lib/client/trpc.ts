import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../server/routers/_app';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (SERVER_SETTINGS.WEBSITES.CHARITY_GAMES_URL())
    return SERVER_SETTINGS.WEBSITES.CHARITY_GAMES_URL();

  // assume localhost
  return `http://localhost:6969`;
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
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
          url: `${getBaseUrl()}/api/trpc`,
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
