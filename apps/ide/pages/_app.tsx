import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { trpc } from '@worksheets/trpc/ide';
import * as FullStory from '@fullstory/browser';
import { Analytics } from '@vercel/analytics/react';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '@worksheets/util-next';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (typeof window !== 'undefined') {
  FullStory.init({
    orgId: 'o-1N7VNF-na1',
    devMode: !SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION(),
  });
}

function CustomApp({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <CssBaseline />
      <Head>
        <title>Worksheets IDE</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
    </>
  );
}

export default trpc.withTRPC(CustomApp);
