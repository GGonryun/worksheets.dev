import { NavigateBefore } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { RafflesGroup } from '@worksheets/ui/components/raffles';
import {
  ParticipationSchema,
  RaffleSchema,
  UserParticipationSchema,
} from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { ParticipantsDescription } from './participants-description';
import { RaffleDescription } from './raffle-description';
import { RaffleDetails } from './raffle-details';

export const RaffleScreen: React.FC<{
  activeRaffles: RaffleSchema[];
  raffle: RaffleSchema;
  youWon?: boolean;
  participants: ParticipationSchema[];
  participation?: UserParticipationSchema;
  onRaffleClick: () => void;
  onShare: () => void;
}> = ({
  participants,
  raffle,
  participation,
  activeRaffles,
  youWon,
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
        youWon={youWon}
        raffle={raffle}
        participation={participation}
        onShare={onShare}
        onRaffleClick={onRaffleClick}
      />
    </Container>

    <RaffleDescription raffle={raffle} onShare={onShare} />

    <ParticipantsDescription participants={participants} />

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
    <Typography fontWeight={700}>All Raffles</Typography>
  </Button>
);
