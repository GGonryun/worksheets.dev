import { NavigateBefore } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import {
  RaffleCarousel,
  RafflesGroup,
} from '@worksheets/ui/components/raffles';
import {
  DetailedRaffleSchema,
  RaffleParticipation,
  RaffleSchema,
} from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { ParticipantsDescription } from './participants-description';
import { RaffleDescription } from './raffle-description';
import { RaffleDetails } from './raffle-details';

export const RaffleScreen: React.FC<{
  userId: string;
  suggestedRaffles: RaffleSchema[];
  activeRaffles: RaffleSchema[];
  raffle: DetailedRaffleSchema;
  participation?: RaffleParticipation;
  //
  onRaffleClick: () => void;
  onShare: () => void;
}> = ({
  userId,
  suggestedRaffles,
  activeRaffles,
  raffle,
  participation,
  //
  onRaffleClick,
  onShare,
}) => (
  <CustomContainer
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 4, sm: 6 },
    }}
  >
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
        userId={userId}
        onShare={onShare}
        onRaffleClick={onRaffleClick}
        participation={participation}
      />
    </Container>

    <RaffleDescription raffle={raffle} onShare={onShare} />

    <ParticipantsDescription
      winners={raffle.winners}
      participants={raffle.participants}
    />

    {Boolean(suggestedRaffles.length) && (
      <RaffleCarousel items={suggestedRaffles} title="Raffles For You" />
    )}

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
