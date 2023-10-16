import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useEventListener, useVersion } from '@worksheets/ui-core';
import { APP_VERSION, GAME_TITLE } from '../util/constants';
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

  useEventListener('touchmove', (e) => e.preventDefault(), undefined, {
    passive: false,
  });

  return (
    <>
      <Head>
        <title>{GAME_TITLE}</title>
        <MobileMeta />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
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
