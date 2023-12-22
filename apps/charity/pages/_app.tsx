import Head from 'next/head';
import './styles.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppPropsWithLayout } from '@worksheets/util-next';
import { trpc } from '@worksheets/trpc-charity';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import * as FullStory from '@fullstory/browser';
import { SessionProvider } from 'next-auth/react';
import theme from '@worksheets/ui/theme';
import { AdSenseScript } from '../scripts';
import { DefaultSeo } from 'next-seo';
import { defaultSeo } from '../util/seo';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <CssBaseline />
      <AdSenseScript />
      <Head>
        <link rel="preconnect" href="https://edge.fullstory.com" />
        <link rel="preconnect" href="https://cdn.charity.games" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Charity.Games" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Charity.Games</title>
      </Head>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <main>{getLayout(<Component {...pageProps} />)}</main>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

export default trpc.withTRPC(CustomApp);
