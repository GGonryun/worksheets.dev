import './styles.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to dev!</title>
      </Head>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  );
}

export default CustomApp;
