import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { PrizesPanels } from '@worksheets/util/enums';
import { RaffleSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { RaffleScreen } from '../components';
import { ConfirmEntryModal } from '../components/modals/confirm-entry-modal';
import { EnterRaffleModal } from '../components/modals/enter-raffle-modal';
import { ShareRaffleModal } from '../components/modals/share-raffle-modal';

const RaffleScreenContainer: React.FC<{ raffle: RaffleSchema }> = ({
  raffle,
}) => {
  const snackbar = useSnackbar();
  const { push } = useRouter();

  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const loginHref = routes.login.path({
    query: {
      redirect: routes.raffle.path({
        params: { raffleId: raffle.id },
      }),
    },
  });

  const accountHref = routes.account.prizes.path({
    bookmark: PrizesPanels.Prizes,
  });

  const user = trpc.user.get.useQuery(undefined, {
    enabled: isConnected,
  });

  const enterRaffle = trpc.user.raffles.enterRaffle.useMutation();

  const participation = trpc.user.raffles.participation.useQuery(
    {
      raffleId: raffle.id,
    },
    {
      enabled: isConnected,
    }
  );

  const tokens = trpc.user.inventory.quantity.useQuery('1', {
    enabled: isConnected,
  });

  const { data: winners } = trpc.public.raffles.winners.useQuery({
    raffleId: raffle.id,
  });

  const { data: participants } = trpc.public.raffles.participants.useQuery({
    raffleId: raffle.id,
  });

  const { data: activeRaffles } = trpc.public.raffles.list.useQuery({
    category: 'active',
  });

  const [showShareRaffleModal, setShowShareRaffleModal] = useState(false);
  const [showEnterRaffleModal, setShowEnterRaffleModal] = useState(false);
  const [showConfirmEntryModal, setShowConfirmEntryModal] = useState(false);

  const handleRaffleClick = () => {
    if (!user.data) {
      push(loginHref);
    }

    const youWon = winners?.some((winner) => winner.userId === user.data?.id);

    if (youWon) {
      push(accountHref);
    } else {
      setShowEnterRaffleModal(true);
    }
  };

  const handleEnterRaffle = async () => {
    if (!isConnected) {
      snackbar.warning('You must be logged in to enter a raffle.');
      return;
    }

    try {
      await enterRaffle.mutateAsync({
        raffleId: raffle.id,
      });

      participation.refetch();
      tokens.refetch();

      snackbar.success('Raffle entry submitted!');
    } catch (error) {
      snackbar.error('Failed to enter raffle. Please try again.');
    } finally {
      setShowConfirmEntryModal(false);
    }
  };

  return (
    <>
      <RaffleScreen
        raffle={raffle}
        activeRaffles={activeRaffles ?? []}
        participation={participation.data}
        onRaffleClick={handleRaffleClick}
        onShare={() => setShowShareRaffleModal(true)}
        winners={winners ?? []}
        participants={participants ?? []}
      />
      <ShareRaffleModal
        open={showShareRaffleModal}
        onClose={() => setShowShareRaffleModal(false)}
        id={raffle.id}
        name={raffle.name}
      />
      <ConfirmEntryModal
        open={showConfirmEntryModal}
        onClose={() => setShowConfirmEntryModal(false)}
        onConfirm={handleEnterRaffle}
      />
      <EnterRaffleModal
        open={showEnterRaffleModal}
        onClose={() => {
          setShowConfirmEntryModal(false);
          setShowEnterRaffleModal(false);
        }}
        onEnter={() => {
          setShowConfirmEntryModal(true);
          setShowEnterRaffleModal(false);
        }}
        tokensOwned={tokens.data ?? 0}
      />
    </>
  );
};

export const DynamicRaffleScreen = dynamic(
  () => Promise.resolve(RaffleScreenContainer),
  {
    ssr: false,
  }
);
