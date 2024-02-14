import './styles.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { DynamicSessionReplay } from '@worksheets/ui/components/session-replay';
import theme from '@worksheets/ui/theme';
import { AppPropsWithLayout } from '@worksheets/util-next';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';

import { defaultSeo } from '../util/seo';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
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
        <SessionProvider session={session}>
          <DynamicSessionReplay />
          <main>{getLayout(<Component {...pageProps} />)}</main>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

export default trpc.withTRPC(CustomApp);
