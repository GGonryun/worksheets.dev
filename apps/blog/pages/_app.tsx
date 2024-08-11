import './styles.css';

import * as FullStory from '@fullstory/browser';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { COOKIE_DOMAIN, IS_PRODUCTION } from '@worksheets/ui/env';
import { BlogLayoutContainer } from '@worksheets/ui/layout';
import theme from '@worksheets/ui/theme';
import { AppPropsWithLayout } from '@worksheets/util-next';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

import { defaultSeo } from '../util/seo';
if (typeof window !== 'undefined') {
  FullStory.init({
    orgId: 'o-1N7VNF-na1',
    devMode: !IS_PRODUCTION,
    cookieDomain: COOKIE_DOMAIN,
  });
}

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <CssBaseline />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <main>
          <BlogLayoutContainer>
            <Component {...pageProps} />
          </BlogLayoutContainer>
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
