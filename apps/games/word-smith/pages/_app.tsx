import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { ThemeProvider, createTheme } from '@mui/material';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION } from '../util';
import { useRouter } from 'next/router';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const theme = createTheme({
  palette: {
    secondary: {
      light: '#42a5f5',
      main: '#1976d2',
      dark: '#1565c0',
    },
    primary: {
      light: '#FBDF88',
      main: '#2E7D32',
      dark: '#F6BE13',
    },
  },
});
function CustomApp({ Component, pageProps }: AppProps) {
  const { reload } = useRouter();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);

  const handleUpdate = () => {
    update();
    reload();
  };

  return (
    <>
      <Head>
        <title>Word Smith</title>
        <MobileMeta />
      </Head>
      <ThemeProvider theme={theme}>
        <main>
          <Component {...pageProps} />
          <UpdateGameModal
            open={requiresUpdate}
            onClose={ignore}
            onUpdate={handleUpdate}
          />
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
