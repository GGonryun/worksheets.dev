import { AppProps } from 'next/app';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { DocumentHead, UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION, GAME_TITLE } from '../util';
import { useSavedPuzzle, useSavedSelections } from '../hooks/useSaveData';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}
const theme = createTheme({
  palette: {
    primary: {
      light: '#2A99F4',
      main: '#1976d2',
      dark: '#10596e',
    },
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  const { reload } = useRouter();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const puzzle = useSavedPuzzle();
  const selections = useSavedSelections();
  const handleUpdate = () => {
    if (puzzle.level > 0) {
      puzzle.cacheLevel(puzzle.level);
      selections.clearSelections();
    }
    update();
    reload();
  };
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
          onUpdate={handleUpdate}
        />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
