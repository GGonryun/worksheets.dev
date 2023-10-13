import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useVersion } from '@worksheets/ui-core';
import * as FullStory from '@fullstory/browser';
import { APP_VERSION, GAME_TITLE } from '../util';
import {
  SERVER_SETTINGS,
  SERVICE_SETTINGS,
} from '@worksheets/data-access/server-settings';
import { verifier } from '../puzzles/verifier';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';
import { usePuzzle } from '../hooks/usePuzzle';
import { useRouter } from 'next/router';

if (!SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION()) {
  verifier();
}

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

function CustomApp({ Component, pageProps }: AppProps) {
  const { reload } = useRouter();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const data = usePuzzle();

  const handleUpdate = () => {
    data.reload();
    update();
    alert('Game updated successfully.');
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
