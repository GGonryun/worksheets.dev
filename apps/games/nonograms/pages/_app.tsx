import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION } from '../util/constants';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { TWITTER_SEO } from '@worksheets/util/seo';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const openGraph = {
  type: 'website',
  url: 'https://nonograms.charity.games/',
  title: 'Nonograms by Charity Games - Free Online Games for Charity',
  description:
    'Nonograms are picture logic puzzles where you fill in squares to reveal a hidden picture. Play more games on Charity Games.',
  images: [
    {
      url: 'https://nonograms.charity.games/banner.png',
      width: 2208,
      height: 1242,
      alt: 'Nonograms Banner',
      type: 'image/png',
    },
  ],
};

function CustomApp({ Component, pageProps }: AppProps) {
  const { reload } = useRouter();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const handleUpdate = () => {
    alert('TODO: update app');
    update();
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
