import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { InventoryPanels } from '@worksheets/util/enums';
import { NO_REFETCH } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { RaffleScreen } from '../components';
import { EnterRaffleModal } from '../components/modals/enter-raffle-modal';
import { ShareRaffleModal } from '../components/modals/share-raffle-modal';

const RaffleScreenContainer: React.FC<{ raffleId: number }> = ({
  raffleId,
}) => {
  const loginHref = routes.login.path({
    query: {
      redirect: routes.raffle.path({
        params: { raffleId },
      }),
    },
  });
  const accountHref = routes.account.inventory.path({
    bookmark: InventoryPanels.Items,
  });

  const { push } = useRouter();

  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const raffle = trpc.public.raffles.find.useQuery(
    {
      raffleId,
    },
    NO_REFETCH
  );

  const user = trpc.user.get.useQuery(undefined, {
    enabled: isConnected,
    ...NO_REFETCH,
  });

  const participation = trpc.user.raffles.participation.useQuery(
    {
      raffleId: raffleId,
    },
    {
      enabled: isConnected,
      ...NO_REFETCH,
    }
  );

  const tokens = trpc.user.inventory.quantity.useQuery('1', {
    enabled: isConnected,
    ...NO_REFETCH,
  });

  const { data: participants } = trpc.public.raffles.participants.useQuery(
    {
      raffleId: raffleId,
    },
    NO_REFETCH
  );

  const { data: activeRaffles } = trpc.public.raffles.list.useQuery(
    {
      category: 'active',
    },
    NO_REFETCH
  );

  const [showShareRaffleModal, setShowShareRaffleModal] = useState(false);
  const [showEnterRaffleModal, setShowEnterRaffleModal] = useState(false);

  const youWon = participants?.some(
    (participant) => participant.userId === user.data?.id && participant.winner
  );

  const handleRaffleClick = () => {
    if (!user.data) {
      push(loginHref);
      return;
    }

    if (youWon) {
      push(accountHref);
    } else {
      setShowEnterRaffleModal(true);
    }
  };

  if (session.status === 'loading' || user.isFetching || raffle.isLoading)
    return <LoadingScreen />;
  if (raffle.isError) return <ErrorScreen />;

  return (
    <>
      <RaffleScreen
        raffle={raffle.data}
        youWon={youWon}
        activeRaffles={activeRaffles ?? []}
        participation={participation.data}
        onRaffleClick={handleRaffleClick}
        onShare={() => setShowShareRaffleModal(true)}
        participants={participants ?? []}
      />
      <ShareRaffleModal
        open={showShareRaffleModal}
        onClose={() => setShowShareRaffleModal(false)}
        id={raffle.data.id}
        name={raffle.data.name}
      />

      <EnterRaffleModal
        raffleId={raffleId}
        open={showEnterRaffleModal}
        onClose={() => {
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
