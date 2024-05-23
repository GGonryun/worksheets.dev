import { Box, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { RafflesGroup } from '@worksheets/ui/components/raffles';
import { RaffleSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { RaffleScreen } from '../components';
import { EnterRaffleModal } from '../components/modals/enter-raffle-modal';
import { ShareRaffleModal } from '../components/modals/share-raffle-modal';
import { ParticipantsDescription } from '../components/raffle-screen/participants-description';
import { RaffleEntry } from '../components/raffle-screen/raffle-entry';

const RaffleScreenContainer: React.FC<{ raffle: RaffleSchema }> = ({
  raffle,
}) => {
  const raffleId = raffle.id;

  const [showShareRaffleModal, setShowShareRaffleModal] = useState(false);
  const [showEnterRaffleModal, setShowEnterRaffleModal] = useState(false);

  return (
    <>
      <RaffleScreen
        raffle={raffle}
        moreRaffles={<MoreRaffles raffleId={raffleId} />}
        participants={<ParticipantsDescription raffleId={raffleId} />}
        raffleEntry={
          <RaffleEntry
            raffle={raffle}
            onEnter={() => setShowEnterRaffleModal(true)}
          />
        }
        onShare={() => setShowShareRaffleModal(true)}
      />
      <ShareRaffleModal
        open={showShareRaffleModal}
        onClose={() => setShowShareRaffleModal(false)}
        id={raffle.id}
        name={raffle.name}
      />
      <EnterRaffleModal
        raffle={raffle}
        open={showEnterRaffleModal}
        onClose={() => {
          setShowEnterRaffleModal(false);
        }}
      />
    </>
  );
};

const MoreRaffles: React.FC<{ raffleId: number }> = ({ raffleId }) => {
  const moreRaffles = trpc.public.raffles.list.useQuery({
    category: 'active',
  });

  if (moreRaffles.isError) {
    return <ErrorComponent message={moreRaffles.error?.message} />;
  }

  const raffles = moreRaffles.data?.filter((r) => r.id !== raffleId) ?? [];

  if (raffles.length === 0) {
    return null;
  }

  return (
    <RafflesGroup
      title={'More Raffles'}
      empty={
        <Box>
          <Typography variant="h6">
            No more raffles available at the moment
          </Typography>
        </Box>
      }
      raffles={raffles}
    />
  );
};

export const DynamicRaffleScreen = dynamic(
  () => Promise.resolve(RaffleScreenContainer),
  {
    ssr: false,
  }
);
