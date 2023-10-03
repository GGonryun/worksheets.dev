import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import styles from './index.module.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dungeon Kata</title>
      </Head>
      <main className={styles['app']}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
