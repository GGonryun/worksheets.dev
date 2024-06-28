import './styles.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { DynamicInitializeSessionReplay } from '@worksheets/ui/components/session-replay';
import { SnackbarContextProvider } from '@worksheets/ui/components/snackbar';
import theme from '@worksheets/ui/theme';
import { AppPropsWithLayout } from '@worksheets/util-next';
import { AppType } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import React from 'react';

import { defaultSeo } from '../util/seo';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

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
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <DynamicInitializeSessionReplay />
          <SnackbarContextProvider>
            <main>{getLayout(<Component {...pageProps} />)}</main>
          </SnackbarContextProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  const ONE_DAY_SECONDS = 60 * 60 * 24;
  ctx.res?.setHeader(
    'Cache-Control',
    `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
  );
  return {
    pageProps: {},
  };
};

export default trpc.withTRPC(MyApp);
