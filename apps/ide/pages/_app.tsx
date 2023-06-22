import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { trpc } from '@worksheets/trpc/ide';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Worksheets IDE</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default trpc.withTRPC(CustomApp);
