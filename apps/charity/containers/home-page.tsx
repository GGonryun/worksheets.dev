import { mixedItems } from '../util/mixed-items';
import Container from '@mui/material/Container';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { MixedGrid } from '@worksheets/ui/game-grid';
import { useRouter } from 'next/router';
import { getRandomGame } from '../util/randomizer';
import { HorizontalAdvertisement } from '@worksheets/ui/advertisements';
import { longHomeAd } from '@worksheets/data-access/charity-games';
import { Box } from '@mui/material';

export const HomePageContainer = () => {
  const { push } = useRouter();

  return (
    <Container maxWidth="desktop3" sx={{ py: 2 }}>
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
            href: '/play',
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
            onClick: () => {
              const randomGame = getRandomGame(true);
              push(`/play/${randomGame.id}`);
            },
            type: 'button',
            text: {
              content: 'Random Game',
              color: 'text.primary',
              variant: 'h4',
            },
            backgroundColor: 'highlight.main',
            width: { xs: '1/-1' },
            Icon: ShuffleIcon,
          },
        ]}
      />
      <Box pt={3} pb={1}>
        <HorizontalAdvertisement {...longHomeAd} />
      </Box>
    </Container>
  );
};
