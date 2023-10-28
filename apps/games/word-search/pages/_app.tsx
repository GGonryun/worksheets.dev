import { AppProps } from 'next/app';
import './styles.css';
import { useVersion } from '@worksheets/ui-core';
import * as FullStory from '@fullstory/browser';
import { APP_VERSION, GAME_TITLE } from '../util';
import {
  SERVER_SETTINGS,
  SERVICE_SETTINGS,
} from '@worksheets/data-access/server-settings';
import { verifier } from '../puzzles/verifier';
import { DocumentHead, UpdateGameModal } from '@worksheets/ui-games';
import { usePuzzle } from '../hooks/usePuzzle';
import { useRouter } from 'next/router';
import { CookieConsentPopup } from '@worksheets/ui-cookie-consent';

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
      <DocumentHead title={GAME_TITLE} />
      <main>
        <Component {...pageProps} />
      </main>
      <UpdateGameModal
        open={requiresUpdate}
        onClose={ignore}
        onUpdate={handleUpdate}
      />
      <CookieConsentPopup />
    </>
  );
}

export default CustomApp;
