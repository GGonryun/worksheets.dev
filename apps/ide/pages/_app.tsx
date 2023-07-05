import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { trpc } from '@worksheets/trpc/ide';
import * as FullStory from '@fullstory/browser';
import { Analytics } from '@vercel/analytics/react';

if (typeof window !== 'undefined') {
  FullStory.init({
    orgId: 'o-1N7VNF-na1',
    devMode: process.env.NODE_ENV !== 'production',
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
