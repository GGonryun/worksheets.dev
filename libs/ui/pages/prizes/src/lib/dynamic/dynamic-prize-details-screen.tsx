import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { PrizeSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { PrizeDetailsScreen } from '../components';
import { ConfirmEntryModal } from '../components/modals/confirm-entry-modal';
import { EnterRaffleModal } from '../components/modals/enter-raffle-modal';
import { SharePrizeModal } from '../components/modals/share-prize-modal';

const PrizeDetailsContainer: React.FC<{ prize: PrizeSchema }> = ({ prize }) => {
  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const snackbar = useSnackbar();

  const enterRaffle = trpc.user.prizes.enterRaffle.useMutation();

  const { data: participation } = trpc.user.prizes.participation.useQuery(
    {
      prizeId: prize.id,
    },
    {
      enabled: isConnected,
    }
  );

  const { data: rewards } = trpc.user.rewards.get.useQuery(undefined, {
    enabled: isConnected,
  });

  const { data: suggestedPrizes } = trpc.prizes.list.useQuery({
    category: 'suggested',
  });

  const { data: activePrizes } = trpc.prizes.list.useQuery({
    category: 'active',
  });

  const [showSharePrizeModal, setShowSharePrizeModal] = useState(false);
  const [showEnterRaffleModal, setShowEnterRaffleModal] = useState(false);
  const [raffleEntries, setRaffleEntries] = useState(0);

  const handleRaffleClick = () => {
    if (!participation?.youWon) {
      snackbar.trigger({
        message: 'You already won this prize!',
        severity: 'warning',
      });

      return;
    }

    if (!isConnected) {
      snackbar.trigger({
        message: 'You must be logged in to enter a raffle.',
        severity: 'warning',
      });
      return;
    }

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
        prizeId: prize.id,
        numEntries: raffleEntries,
      });

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
      <PrizeDetailsScreen
        suggestedPrizes={suggestedPrizes ?? []}
        prize={prize}
        allPrizes={activePrizes ?? []}
        connected={isConnected}
        yourEntries={participation?.entries ?? 0}
        youWon={participation?.youWon ?? false}
        onRaffleClick={handleRaffleClick}
        onShare={() => setShowSharePrizeModal(true)}
      />
      <SharePrizeModal
        open={showSharePrizeModal}
        onClose={() => setShowSharePrizeModal(false)}
        id={prize.id}
        name={prize.name}
      />
      <ConfirmEntryModal
        open={raffleEntries > 0}
        onClose={() => setRaffleEntries(0)}
        onConfirm={handleEnterRaffle}
        numEntries={raffleEntries}
        costPerEntry={prize.costPerEntry}
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
        costPerEntry={prize.costPerEntry}
        tokensOwned={rewards?.totalTokens ?? 0}
      />
      <Snackbar {...snackbar.props} />
    </>
  );
};

export const DynamicPrizeDetailsScreen = dynamic(
  () => Promise.resolve(PrizeDetailsContainer),
  {
    ssr: false,
  }
);
