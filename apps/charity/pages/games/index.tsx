import { MixedGrid } from '@worksheets/ui/game-grid';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { Container } from '@mui/material';
import { gameItems } from '../../util/mixed-items';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { getRandomGame } from '../../util/randomizer';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const openGraph = {
  url: `https://www.charity.games/games`,
  title: `Charity Games - All Games`,
  description: `Find and play your favorite mobile and desktop games for free on Charity Games. The easiest way to donate to charity.`,
};

const Page: NextPageWithLayout = () => {
  const { push } = useRouter();

  return (
    <>
      <NextSeo
        title={openGraph.title}
        description={openGraph.description}
        canonical={openGraph.url}
        openGraph={openGraph}
      />
      <Container
        maxWidth="lg"
        sx={{
          py: 2,
        }}
      >
        <MixedGrid
          items={[
            {
              type: 'text',
              text: 'All Games',
              color: { background: 'error.main', font: 'error.contrastText' },
            },
            ...gameItems().map((item) => ({
              ...item,
              span: 1,
            })),
            {
              type: 'button',
              text: {
                content: 'All Tags',
                color: 'primary.contrastText',
                variant: 'h4',
              },
              backgroundColor: 'primary.main',
              href: '/tags',
              Icon: LocalOfferOutlinedIcon,
              width: { xs: '1/-1', sm: `span 3` },
            },
            {
              type: 'button',
              text: {
                content: 'Random Game',
                color: 'text.primary',
                variant: 'h4',
              },
              backgroundColor: 'highlight.main',
              onClick: () => {
                const randomGame = getRandomGame(true);
                push(`/games/${randomGame.id}`);
              },
              width: { xs: '1/-1' },
              Icon: ShuffleIcon,
            },
          ]}
        />
      </Container>
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
