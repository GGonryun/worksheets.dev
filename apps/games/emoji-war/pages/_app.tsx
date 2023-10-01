import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import styles from './index.module.scss';
import * as FullStory from '@fullstory/browser';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

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
