import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { createTheme, ThemeProvider } from '@mui/material';
import styles from './index.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: ['FirstTimeWriting', 'sans-serif'].join(','),
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link
        rel="preload"
        href="/fonts/FirstTimeWriting.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <Head>
        <title>Puzzle Words</title>
      </Head>
      <ThemeProvider theme={theme}>
        <main className={styles['page']}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
