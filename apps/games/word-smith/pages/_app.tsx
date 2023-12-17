import { AppProps } from 'next/app';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION } from '../util';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material';
import { MobileMeta } from '@worksheets/ui-games';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { TWITTER_SEO } from '@worksheets/util/seo';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#000',
      main: '#000',
      dark: '#000',
    },
  },
});

const openGraph = {
  type: 'website',
  url: 'https://word-smith.charity.games/',
  title: 'Word Smith by Charity Games - Free Online Games for Charity',
  description:
    'Word Smith is a free online puzzle game that donates money to charitable causes when you find mystery words! Play more games on Charity Games.',
  images: [
    {
      url: 'https://word-smith.charity.games/banner.png',
      width: 2208,
      height: 1242,
      alt: 'Word Smith Banner',
      type: 'image/png',
    },
  ],
};

function CustomApp({ Component, pageProps }: AppProps) {
  const { reload } = useRouter();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);

  const handleUpdate = () => {
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
      <ThemeProvider theme={theme}>
        <main>
          <Component {...pageProps} />
        </main>
        <UpdateGameModal
          open={requiresUpdate}
          onClose={ignore}
          onUpdate={handleUpdate}
        />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
