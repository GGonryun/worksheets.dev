import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION } from '../util';
import { UpdateGameModal } from '../components/UpdateGameModal';

function CustomApp({ Component, pageProps }: AppProps) {
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);

  return (
    <>
      <Head>
        <title>Word Search</title>
      </Head>
      <main>
        <Component {...pageProps} />
        <UpdateGameModal
          open={requiresUpdate}
          onClose={ignore}
          onUpdate={update}
        />
      </main>
    </>
  );
}

export default CustomApp;
