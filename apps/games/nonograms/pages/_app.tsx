import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION, GAME_TITLE } from '../util';
import { useRouter } from 'next/router';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

function CustomApp({ Component, pageProps }: AppProps) {
  const { reload } = useRouter();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const handleUpdate = () => {
    alert('TODO: update app');
    update();
    reload();
  };
  return (
    <>
      <Head>
        <title>{GAME_TITLE}</title>
        <MobileMeta />
      </Head>
      <main>
        <Component {...pageProps} />
        <UpdateGameModal
          open={requiresUpdate}
          onClose={ignore}
          onUpdate={handleUpdate}
        />
      </main>
    </>
  );
}

export default CustomApp;
