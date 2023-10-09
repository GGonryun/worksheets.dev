import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useVersion } from '@worksheets/ui-core';
import * as FullStory from '@fullstory/browser';
import { APP_VERSION } from '../util';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

function CustomApp({ Component, pageProps }: AppProps) {
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);

  return (
    <>
      <Head>
        <title>Word Search</title>
        <MobileMeta />
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
