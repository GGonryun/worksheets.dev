import { AppProps } from 'next/app';
import './styles.css';
import styles from './index.module.scss';
import * as FullStory from '@fullstory/browser';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { DocumentHead } from '@worksheets/ui-games';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DocumentHead title={'Emoji War'} />
      <main className={styles['app']}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
