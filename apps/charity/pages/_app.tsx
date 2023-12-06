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
      <DefaultSeo
        description="On Charity Games you can play free online HTML browser games. Every click donates money to charitable causes. Play alone or with friends. We support mobile and desktop games."
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          siteName: 'Charity Games',
          description:
            'On Charity Games you can play free online HTML browser games. Every click donates money to charitable causes. Play alone or with friends. We support mobile and desktop games.',
          images: [
            {
              url: 'https://charity.games/og-image.png',
              width: 978,
              height: 800,
              alt: 'Charity Games Logo',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@CharityGamesGo',
          site: '@CharityGamesGo',
          cardType: 'summary_large_image',
        }}
      />
      <CssBaseline />
      <AdSenseScript />
      <Head>
        <link rel="preconnect" href="https://edge.fullstory.com" />
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
