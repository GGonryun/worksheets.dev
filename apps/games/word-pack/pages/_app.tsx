import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import styles from './index.module.scss';
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to word-pack!</title>
      </Head>
      <main className={styles['page']}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
