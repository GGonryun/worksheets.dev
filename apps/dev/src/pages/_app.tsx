import './styles.css';

import { trpc } from '@worksheets/trpc-charity';
import { Toaster } from '@worksheets/ui/shadcn';
import { AppPropsWithLayout } from '@worksheets/util-next';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <title> Developer Portal | Charity Games</title>
      </Head>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <main className="app">{getLayout(<Component {...pageProps} />)}</main>
        <Toaster />
      </SessionProvider>
    </>
  );
}

export default trpc.withTRPC(App);
