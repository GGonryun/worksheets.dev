import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { Container } from '@mui/material';
import { tagItems } from '../../util/mixed-items';
import { MixedGrid } from '@worksheets/ui/game-grid';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { NextSeo } from 'next-seo';
import { tagsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...tagsSeo} />
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
            text: 'All Tags',
            variant: 'h4',
            color: { background: 'primary.main', font: 'primary.contrastText' },
          },
          ...tagItems(),
          {
            type: 'button',
            text: {
              content: 'More Games',
              color: 'error.contrastText',
              variant: 'h4',
            },
            backgroundColor: 'error.main',
            href: '/play',
            Icon: SportsEsportsOutlinedIcon,
            width: { xs: '1/-1', sm: `span 3` },
          },
        ]}
      />
    </Container>
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
