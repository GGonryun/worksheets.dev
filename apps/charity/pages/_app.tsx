import './styles.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import * as FullStory from '@fullstory/browser';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { trpc } from '@worksheets/trpc-charity';
import { COOKIE_DOMAIN, IS_PRODUCTION } from '@worksheets/ui/env';
import theme from '@worksheets/ui/theme';
import { AppPropsWithLayout } from '@worksheets/util-next';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';

import { defaultSeo } from '../util/seo';
if (typeof window !== 'undefined') {
  FullStory.init({
    orgId: 'o-1N7VNF-na1',
    devMode: !IS_PRODUCTION,
    cookieDomain: COOKIE_DOMAIN,
  });
}

const cache = createCache({
  key: 'css',
  prepend: true,
});

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppCacheProvider {...pageProps}>
      <DefaultSeo {...defaultSeo} />

      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      <StyledEngineProvider injectFirst>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
              <main>{getLayout(<Component {...pageProps} />)}</main>
            </SessionProvider>
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </AppCacheProvider>
  );
}

export default trpc.withTRPC(CustomApp);
