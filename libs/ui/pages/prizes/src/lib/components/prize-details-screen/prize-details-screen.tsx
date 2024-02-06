import { NavigateBefore } from '@mui/icons-material';
import { Box, Container, Link, Typography } from '@mui/material';
import { TitledPrizeCarousel } from '@worksheets/ui/components/prizes';
import { PrizeSchema } from '@worksheets/util/types';

import { PrizesGroup } from '../prize-wall-screen/prizes-group';
import { CustomContainer } from '../shared/custom-container';
import { PrizeDescription } from './prize-description';
import { PrizeDetails } from './prize-details';

export const PrizeDetailsScreen: React.FC<{
  suggestedPrizes: PrizeSchema[];
  allPrizes: PrizeSchema[];
  prize: PrizeSchema;
  yourEntries: number;
  youWon: boolean;
  connected: boolean;
  onRaffleClick: () => void;
  onShare: () => void;
}> = ({
  suggestedPrizes,
  youWon,
  allPrizes,
  prize,
  yourEntries,
  connected,
  onRaffleClick,
  onShare,
}) => (
  <CustomContainer>
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <AllPrizesLink />
      <PrizeDetails
        {...prize}
        youWon={youWon}
        onShare={onShare}
        onRaffleClick={onRaffleClick}
        yourEntries={yourEntries}
        connected={connected}
      />
    </Container>

    <Gutter />

    <PrizeDescription
      prize={prize}
      onShare={() => alert('TODO: show share modal')}
    />

    <Gutter />

    {Boolean(suggestedPrizes.length) && (
      <TitledPrizeCarousel items={suggestedPrizes} title="Prizes For You" />
    )}

    <Gutter />

    <PrizesGroup
      header={
        <Typography typography={{ xs: 'h5', sm: 'h4' }}>All Prizes</Typography>
      }
      prizes={allPrizes}
    />
  </CustomContainer>
);

const AllPrizesLink = () => (
  <Link
    href="/prizes"
    color="text.arcade"
    sx={{
      display: 'flex',
      gap: 0.5,
      pl: -0.5,
    }}
  >
    <NavigateBefore />
    <Typography>All Prizes</Typography>
  </Link>
);

const Gutter = () => <Box my={{ xs: 1, sm: 2 }} />;
