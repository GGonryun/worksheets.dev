import { AppProps } from 'next/app';
import './styles.css';
import { createTheme, ThemeProvider } from '@mui/material';
import * as FullStory from '@fullstory/browser';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { usePlayer } from '../lib/hooks';
import { useRouter } from 'next/router';
import { APP_VERSION, GAME_TITLE, UPDATE_BONUS } from '../lib/constants';
import { useVersion } from '@worksheets/ui-core';
import { DocumentHead, UpdateGameModal } from '@worksheets/ui-games';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#633aa9',
      main: '#532481',
      dark: '#271346',
    },
    secondary: {
      light: '#F7D778',
      main: '#f5cb52',
      dark: '#E7B10D',
    },
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  const player = usePlayer();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const { reload } = useRouter();

  return (
    <>
      <DocumentHead title={GAME_TITLE} />
      <ThemeProvider theme={theme}>
        <main>
          <Component {...pageProps} />
        </main>
        <UpdateGameModal
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
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
