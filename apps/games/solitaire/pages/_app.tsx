import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION } from '../util/constants';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material';
import { DefaultSeo } from 'next-seo';
import { TWITTER_SEO } from '@worksheets/util/env';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20',
    },
    secondary: {
      light: '#2A99F4',
      main: '#1976d2',
      dark: '#1565c0',
    },
  },
});

const openGraph = {
  type: 'website',
  url: 'https://solitaire.charity.games/',
  title: 'Solitaire by Charity Games - Free Online Games for Charity',
  description:
    'Solitaire is a popular card game that is free to play. Our game works on mobile, tablet, and desktop devices. Play more games on Charity Games.',
  images: [
    {
      url: 'https://solitaire.charity.games/banner.png',
      width: 2208,
      height: 1242,
      alt: 'Solitaire Banner',
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
