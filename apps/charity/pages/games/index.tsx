import { MixedGrid } from '@worksheets/ui-charity';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { Container } from '@mui/material';
import { gameItems } from '../../util/mixed-items';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const Page: NextPageWithLayout = () => (
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
          href: '/random',
          width: { xs: '1/-1' },
          Icon: ShuffleIcon,
        },
      ]}
    />
  </Container>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
