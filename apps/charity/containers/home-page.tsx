import { useGoogleAdsense } from '@worksheets/ui/advertisements';
import { mixedItems } from '../util/mixed-items';
import Container from '@mui/material/Container';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { MixedGrid } from '@worksheets/ui/game-grid';

export const HomePageContainer = () => {
  useGoogleAdsense();

  return (
    <Container sx={{ py: 2 }}>
      <MixedGrid
        items={[
          ...mixedItems({
            maxGames: 50,
            maxTags: 10,
          }),
          {
            type: 'button',
            text: {
              content: 'More Games',
              color: 'error.contrastText',
              variant: 'h4',
            },
            backgroundColor: 'error.main',
            href: '/games',
            Icon: SportsEsportsOutlinedIcon,
            width: { xs: '1/-1', sm: `span 3` },
          },
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
};
