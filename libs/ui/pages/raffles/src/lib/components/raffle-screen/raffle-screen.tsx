import { NavigateBefore } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import {
  RaffleCarousel,
  RafflesGroup,
} from '@worksheets/ui/components/raffles';
import { RaffleSchema } from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { RaffleDescription } from './raffle-description';
import { RaffleDetails } from './raffle-details';

export const RaffleScreen: React.FC<{
  suggestedRaffles: RaffleSchema[];
  activeRaffles: RaffleSchema[];
  raffle: RaffleSchema;
  yourEntries: number;
  youWon: boolean;
  connected: boolean;
  onRaffleClick: () => void;
  onShare: () => void;
}> = ({
  suggestedRaffles,
  youWon,
  activeRaffles,
  raffle,
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
      <AllRafflesLink />
      <RaffleDetails
        {...raffle}
        youWon={youWon}
        onShare={onShare}
        onRaffleClick={onRaffleClick}
        yourEntries={yourEntries}
        connected={connected}
      />
    </Container>

    <Gutter />

    <RaffleDescription raffle={raffle} onShare={onShare} />

    {Boolean(suggestedRaffles.length) && (
      <>
        <Gutter />
        <RaffleCarousel items={suggestedRaffles} title="Raffles For You" />
      </>
    )}

    <Gutter />

    <RafflesGroup title={'More Raffles'} raffles={activeRaffles} />
  </CustomContainer>
);

const AllRafflesLink = () => (
  <Button
    href="/raffles"
    color="white"
    startIcon={<NavigateBefore />}
    sx={{
      textDecoration: 'underline',
      width: 'fit-content',
      alignSelf: 'flex-start',
    }}
  >
    <Typography>All Raffles</Typography>
  </Button>
);

const Gutter = () => <Box my={{ xs: 1, sm: 2 }} />;
