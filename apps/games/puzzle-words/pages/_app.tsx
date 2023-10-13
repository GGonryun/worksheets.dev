import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import styles from './index.module.scss';
import { createTheme, ThemeProvider } from '@mui/material';
import localFont from 'next/font/local';
import * as FullStory from '@fullstory/browser';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { usePlayer } from '../lib/hooks';
import { UpdateVersionModal } from '../lib/components';
import { useRouter } from 'next/router';
import { APP_VERSION, GAME_TITLE, UPDATE_BONUS } from '../lib/constants';
import { useVersion } from '@worksheets/ui-core';
import { MobileMeta } from '@worksheets/ui-games';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const FirstTimeWriting = localFont({
  src: '../public/fonts/FirstTimeWriting.woff2',
});

const theme = createTheme({
  typography: {
    fontFamily: [FirstTimeWriting.style.fontFamily, 'sans-serif'].join(','),
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  const player = usePlayer();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const { reload } = useRouter();

  return (
    <>
      <Head>
        <MobileMeta />
        <title>{GAME_TITLE}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <main className={styles['page']}>
          <UpdateVersionModal
            open={requiresUpdate}
            onClose={ignore}
            onUpdate={() => {
              // force an update
              update();
              // assign player bonuses
              player.addTokens(UPDATE_BONUS);
              player.loadPuzzle(player.level);
              // reload the page
              reload();
            }}
          />
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
