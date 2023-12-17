import { AppProps } from 'next/app';
import './styles.css';
import * as FullStory from '@fullstory/browser';
import { UpdateGameModal } from '@worksheets/ui-games';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { useVersion } from '@worksheets/ui-core';
import { APP_VERSION } from '../util';
import { useSavedPuzzle, useSavedSelections } from '../hooks/useSaveData';
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
      light: '#2A99F4',
      main: '#1976d2',
      dark: '#10596e',
    },
  },
});

const openGraph = {
  type: 'website',
  url: 'https://word-pack.charity.games/',
  title: 'Word Pack by Charity Games - Free Online Games for Charity',
  description:
    'Word Pack is a crossword puzzle game that is free to play. Our game works on mobile, tablet, and desktop devices. Play more games on Charity Games.',
  images: [
    {
      url: 'https://word-pack.charity.games/banner.jpg',
      width: 2208,
      height: 1242,
      alt: 'Word Pack Banner',
      type: 'image/jpg',
    },
  ],
};

function CustomApp({ Component, pageProps }: AppProps) {
  const { reload } = useRouter();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const puzzle = useSavedPuzzle();
  const selections = useSavedSelections();
  const handleUpdate = () => {
    if (puzzle.level > 0) {
      puzzle.cacheLevel(puzzle.level);
      selections.clearSelections();
    }
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
