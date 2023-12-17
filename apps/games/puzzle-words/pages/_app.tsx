import { AppProps } from 'next/app';
import './styles.css';
import { createTheme, ThemeProvider } from '@mui/material';
import * as FullStory from '@fullstory/browser';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import { usePlayer } from '../lib/hooks';
import { useRouter } from 'next/router';
import { APP_VERSION, UPDATE_BONUS } from '../lib/constants';
import { useVersion } from '@worksheets/ui-core';
import { MobileMeta, UpdateGameModal } from '@worksheets/ui-games';
import { TWITTER_SEO } from '@worksheets/util/seo';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#633aa9',
      main: '#532481',
      dark: '#271346',
    },
    secondary: {
      light: '#F7D778',
      main: '#f5cb52',
      dark: '#E7B10D',
    },
  },
});

const openGraph = {
  type: 'website',
  url: 'https://puzzle-words.charity.games/',
  title: 'Puzzle Words by Charity Games - Free Online Games for Charity',
  description:
    'Puzzle Words is a puzzle game where you swipe to connect letters and spell words. Great your brain! Play more games on Charity Games. ',
  images: [
    {
      url: 'https://puzzle-words.charity.games/banner.jpg',
      width: 2208,
      height: 1242,
      alt: 'Puzzle Words Banner',
      type: 'image/jpg',
    },
  ],
};

function CustomApp({ Component, pageProps }: AppProps) {
  const player = usePlayer();
  const { requiresUpdate, update, ignore } = useVersion(APP_VERSION);
  const { reload } = useRouter();

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
          onUpdate={() => {
            // force an update
            update();
            // assign player bonuses
            player.addTokens(UPDATE_BONUS);
            player.loadPuzzle(player.level);
            // reload the page
            reload();
          }}
        />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
