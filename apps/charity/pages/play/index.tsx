import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Container } from '@mui/material';
import { MixedGrid } from '@worksheets/ui/game-grid';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { DynamicLayout } from '../../dynamic/dynamic-layout';
import { gameItems } from '../../util/mixed-items';
import { getRandomGame } from '../../util/randomizer';
import { gamesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const { push } = useRouter();

  return (
    <>
      <NextSeo {...gamesSeo} />
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
                push(`/play/${randomGame.id}`);
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
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
