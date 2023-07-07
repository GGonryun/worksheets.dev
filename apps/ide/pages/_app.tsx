import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { trpc } from '@worksheets/trpc/ide';
import * as FullStory from '@fullstory/browser';
import { Analytics } from '@vercel/analytics/react';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

if (typeof window !== 'undefined') {
  FullStory.init({
    orgId: 'o-1N7VNF-na1',
    devMode: !SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION(),
  });
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Worksheets IDE</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default trpc.withTRPC(CustomApp);
