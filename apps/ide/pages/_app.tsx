import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { trpc } from '@worksheets/trpc/ide';
import * as FullStory from '@fullstory/browser';
import { Analytics } from '@vercel/analytics/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactElement } from 'react';
import { AppPropsWithLayout } from '@worksheets/util-next';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
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
