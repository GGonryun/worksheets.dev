import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import styles from './index.module.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <Head>
        <title>Emoji War</title>
      </Head>
      <main className={styles['app']}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
