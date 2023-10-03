import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { createTheme, ThemeProvider } from '@mui/material';
import styles from './index.module.scss';
import localFont from 'next/font/local';
import * as FullStory from '@fullstory/browser';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useVersion } from '../lib/hooks';
import { UpdateVersionModal } from '../lib/components';
import { useRouter } from 'next/router';

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
  const { requiresUpdate, update, ignore } = useVersion();
  const { reload } = useRouter();

  return (
    <>
      <Head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>Puzzle Words</title>
      </Head>
      <ThemeProvider theme={theme}>
        <main className={styles['page']}>
          <UpdateVersionModal
            open={requiresUpdate}
            onClose={ignore}
            onUpdate={() => {
              // force an update
              update();
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
