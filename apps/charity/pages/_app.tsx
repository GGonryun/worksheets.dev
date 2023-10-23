import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { CssBaseline } from '@mui/material';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>Charity Games!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
