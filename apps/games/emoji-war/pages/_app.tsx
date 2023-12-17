import { AppProps } from 'next/app';
import './styles.css';
import styles from './index.module.scss';
import * as FullStory from '@fullstory/browser';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { MobileMeta } from '@worksheets/ui-games';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { TWITTER_SEO } from '@worksheets/util/seo';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const openGraph = {
  type: 'website',
  url: 'https://emoji-war.charity.games/',
  title: 'Emoji-War by Charity Games - Free Online Games for Charity',
  description:
    'Emoji War is a free online HTML browser game that donates money to charitable causes. Play more games on Charity Games. We support mobile and desktop games.',
  images: [
    {
      url: 'https://emoji-war.charity.games/banner.jpg',
      width: 2208,
      height: 1242,
      alt: 'Emoji War Banner',
      type: 'image/jpg',
    },
  ],
};

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title={openGraph.title}
        description={openGraph.description}
        canonical={openGraph.url}
        openGraph={openGraph}
        twitter={TWITTER_SEO}
      />
      <Head>
        <MobileMeta />
      </Head>
      <main className={styles['app']}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
