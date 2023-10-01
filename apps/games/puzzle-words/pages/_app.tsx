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
      <main className={styles['page']}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
