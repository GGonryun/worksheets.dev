import { NavigateBefore } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { HorizontalAdvertisement } from '@worksheets/ui/components/advertisements';
import { RaffleSchema } from '@worksheets/util/types';
import React from 'react';

import { CustomContainer } from '../shared/custom-container';
import { RaffleDescription } from './raffle-description';
import { RaffleDetails } from './raffle-details';

export const RaffleScreen: React.FC<{
  moreRaffles: React.ReactNode;
  participants: React.ReactNode;
  raffle: RaffleSchema;
  raffleEntry: React.ReactNode;
  onShare: () => void;
}> = ({ participants, raffle, raffleEntry, moreRaffles, onShare }) => (
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
        raffleEntry={raffleEntry}
        onShare={onShare}
      />
    </Container>
    <HorizontalAdvertisement unit="raffle" text bordered tall />

    <RaffleDescription raffle={raffle} onShare={onShare} />

    {participants}

    {moreRaffles}
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
