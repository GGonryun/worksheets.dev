import { AppProps } from 'next/app';
import './styles.css';
import { useVersion } from '@worksheets/ui-core';
import * as FullStory from '@fullstory/browser';
import { APP_VERSION } from '../util';
import {
  SERVER_SETTINGS,
  SERVICE_SETTINGS,
} from '@worksheets/data-access/server-settings';
import { verifier } from '../puzzles/verifier';
import { UpdateGameModal } from '@worksheets/ui-games';
import { usePuzzle } from '../hooks/usePuzzle';
import { useRouter } from 'next/router';
import { MobileMeta } from '@worksheets/ui-games';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { TWITTER_SEO } from '@worksheets/util/seo';

if (!SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION()) {
  verifier();
}

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const openGraph = {
  type: 'website',
  url: 'https://word-search.charity.games/',
  title: 'Word Search by Charity Games - Free Online Games for Charity',
  description:
    'Word Search is a free online HTML browser game for kids that donates money to charitable causes. Play more games on Charity Games.',
  images: [
    {
      url: 'https://word-search.charity.games/banner.jpg',
      width: 2208,
      height: 1242,
      alt: 'Word Search Banner',
      type: 'image/jpg',
    },
  ],
};

function CustomApp({ Component, pageProps }: AppProps) {
  const { reload } = useRouter();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const data = usePuzzle();

  const handleUpdate = () => {
    data.reload();
    update();
    alert('Game updated successfully.');
    reload();
  };

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
      <main>
        <Component {...pageProps} />
      </main>
      <UpdateGameModal
        open={requiresUpdate}
        onClose={ignore}
        onUpdate={handleUpdate}
      />
    </>
  );
}

export default CustomApp;
