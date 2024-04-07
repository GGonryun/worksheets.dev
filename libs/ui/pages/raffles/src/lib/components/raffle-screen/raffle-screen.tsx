import { NavigateBefore } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { RafflesGroup } from '@worksheets/ui/components/raffles';
import {
  ParticipationSchema,
  RaffleSchema,
  WinnerSchema,
} from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { ParticipantsDescription } from './participants-description';
import { RaffleDescription } from './raffle-description';
import { RaffleDetails } from './raffle-details';

export const RaffleScreen: React.FC<{
  activeRaffles: RaffleSchema[];
  raffle: RaffleSchema;
  winners: WinnerSchema[];
  participants: ParticipationSchema[];
  participation?: ParticipationSchema;
  onRaffleClick: () => void;
  onShare: () => void;
}> = ({
  winners,
  participants,
  raffle,
  participation,
  activeRaffles,
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
        raffle={raffle}
        participation={participation}
        winners={winners}
        onShare={onShare}
        onRaffleClick={onRaffleClick}
      />
    </Container>

    <RaffleDescription raffle={raffle} onShare={onShare} />

    <ParticipantsDescription winners={winners} participants={participants} />

    <RafflesGroup title={'More Raffles'} raffles={activeRaffles} />
  </CustomContainer>
);

const AllRafflesLink = () => (
  <Button
    href={routes.raffles.path()}
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
