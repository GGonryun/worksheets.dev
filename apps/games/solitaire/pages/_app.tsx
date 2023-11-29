import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION, GAME_TITLE } from '../util/constants';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20',
    },
    secondary: {
      light: '#2A99F4',
      main: '#1976d2',
      dark: '#1565c0',
    },
  },
});

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
