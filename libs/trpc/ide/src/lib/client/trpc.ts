import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../server/routers/_app';
import { firebaseAuth } from '@worksheets/firebase/client';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (process.env.BASE_URL)
    // reference for vercel host.com
    return `https://${process.env.VERCEL_URL}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 4200}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
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
            let authHeaders: {
              Authorization?: string;
              'x-test-header': string;
            } = { 'x-test-header': 'miguelito' };

            const currentUser = firebaseAuth.currentUser;
            if (!currentUser) {
              return authHeaders;
            }

            try {
              const token = await currentUser.getIdToken();
              if (token) {
                authHeaders = {
                  'x-test-header': 'miguelito',
                  Authorization: `Bearer ${token}`,
                };
              }
            } catch (error) {
              console.error(`failed to refresh id token`, error);
            }

            return authHeaders;
          },
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});
