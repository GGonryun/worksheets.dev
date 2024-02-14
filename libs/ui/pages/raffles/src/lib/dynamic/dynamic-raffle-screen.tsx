import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { DetailedRaffleSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { RaffleScreen } from '../components';
import { ConfirmEntryModal } from '../components/modals/confirm-entry-modal';
import { EnterRaffleModal } from '../components/modals/enter-raffle-modal';
import { ShareRaffleModal } from '../components/modals/share-raffle-modal';

const RaffleScreenContainer: React.FC<{ raffle: DetailedRaffleSchema }> = ({
  raffle,
}) => {
  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const snackbar = useSnackbar();

  const enterRaffle = trpc.user.raffles.enterRaffle.useMutation();

  const participation = trpc.user.raffles.participation.useQuery(
    {
      raffleId: raffle.id,
    },
    {
      enabled: isConnected,
    }
  );

  const rewards = trpc.user.rewards.get.useQuery(undefined, {
    enabled: isConnected,
  });

  const { data: suggestedRaffles } = trpc.public.raffles.list.useQuery({
    category: 'suggested',
    limit: 7,
  });

  const { data: activeRaffles } = trpc.public.raffles.list.useQuery({
    category: 'active',
  });

  const [showShareRaffleModal, setShowShareRaffleModal] = useState(false);
  const [showEnterRaffleModal, setShowEnterRaffleModal] = useState(false);
  const [raffleEntries, setRaffleEntries] = useState(0);

  const handleRaffleClick = () => {
    setShowEnterRaffleModal(true);
  };

  const handleEnterRaffle = async () => {
    if (!isConnected) {
      snackbar.trigger({
        message: 'You must be logged in to enter a raffle.',
        severity: 'warning',
      });
      return;
    }

    try {
      await enterRaffle.mutateAsync({
        raffleId: raffle.id,
        numEntries: raffleEntries,
      });

      participation.refetch();
      rewards.refetch();

      snackbar.trigger({
        message: 'Raffle entry submitted!',
        severity: 'success',
      });
    } catch (error) {
      snackbar.trigger({
        message: 'Failed to enter raffle. Please try again.',
        severity: 'error',
      });
    } finally {
      setRaffleEntries(0);
    }
  };

  return (
    <>
      <RaffleScreen
        userId={session.data?.user?.id ?? ''}
        suggestedRaffles={suggestedRaffles ?? []}
        raffle={raffle}
        activeRaffles={activeRaffles ?? []}
        participation={participation.data}
        onRaffleClick={handleRaffleClick}
        onShare={() => setShowShareRaffleModal(true)}
      />
      <ShareRaffleModal
        open={showShareRaffleModal}
        onClose={() => setShowShareRaffleModal(false)}
        id={raffle.id}
        name={raffle.name}
      />
      <ConfirmEntryModal
        open={raffleEntries > 0}
        onClose={() => setRaffleEntries(0)}
        onConfirm={handleEnterRaffle}
        numEntries={raffleEntries}
        costPerEntry={raffle.costPerEntry}
      />
      <EnterRaffleModal
        open={showEnterRaffleModal}
        onClose={() => {
          setRaffleEntries(0);
          setShowEnterRaffleModal(false);
        }}
        onEnter={(num) => {
          setRaffleEntries(num);
          setShowEnterRaffleModal(false);
        }}
        costPerEntry={raffle.costPerEntry}
        tokensOwned={rewards.data?.totalTokens ?? 0}
      />
      <Snackbar {...snackbar.props} />
    </>
  );
};

export const DynamicRaffleScreen = dynamic(
  () => Promise.resolve(RaffleScreenContainer),
  {
    ssr: false,
  }
);
