import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useVersion } from '@worksheets/ui-core';
import * as FullStory from '@fullstory/browser';
import { APP_VERSION } from '../util';
import { UpdateGameModal } from '../components/UpdateGameModal';
import {
  SERVER_SETTINGS,
  SERVICE_SETTINGS,
} from '@worksheets/data-access/server-settings';
import { verifier } from '../puzzles/verifier';

if (!SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION()) {
  verifier();
}

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

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
