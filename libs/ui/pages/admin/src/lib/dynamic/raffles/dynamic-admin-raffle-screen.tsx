import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import dynamic from 'next/dynamic';
import React from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { DataGroup } from '../../shared/data-group';
import { DataPair } from '../../shared/data-pair';
import { ListButton } from '../../shared/list-button';

const AdminRaffleScreen: React.FC<{ raffleId: number }> = ({ raffleId }) => {
  const raffle = trpc.admin.raffles.find.useQuery({
    raffleId,
  });

  if (raffle.isLoading) return <LoadingScreen />;
  if (raffle.error) return <ErrorScreen message={raffle.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.raffles.path()}>All Raffles</ListButton>
      <CustomPaper title={`Raffle Details`}>
        <DataPair
          label="ID"
          value={raffle.data.raffleId}
          href={routes.raffle.path({
            params: {
              raffleId: raffle.data.raffleId,
            },
          })}
        />
        <DataPair
          label="Prize ID"
          value={raffle.data.prizeId}
          href={routes.admin.prize.path({
            params: {
              prizeId: raffle.data.prizeId,
            },
          })}
        />
        <DataPair label="Status" value={raffle.data.status} />
        <DataPair label="Max Winners" value={raffle.data.numWinners} />
        <DataPair
          label="ExpiresAt"
          value={printShortDateTime(raffle.data.expiresAt)}
        />
        <DataPair
          label="Created At"
          value={printShortDateTime(raffle.data.createdAt)}
        />

        <DataGroup
          label="Participants"
          items={raffle.data.participants}
          builder={(participant) => ({
            key: participant.userId,
            label: `User ID`,
            value: `${participant.userId} (${participant.numEntries} entries)`,
            href: routes.admin.user.path({
              params: {
                userId: participant.userId,
              },
            }),
          })}
        />

        <DataGroup
          label="Winners"
          items={raffle.data.winners}
          builder={(winner) => ({
            key: winner.winnerId,
            label: `Winner ID`,
            value: winner.winnerId,
            href: routes.admin.winner.path({
              params: {
                winnerId: winner.winnerId,
              },
            }),
          })}
        />

        <DataGroup
          label="Codes"
          items={raffle.data.codes}
          builder={(code) => ({
            key: code.codeId,
            label: `Code ID`,
            value: code.codeId,
            href: routes.admin.code.path({
              params: {
                codeId: code.codeId,
              },
            }),
          })}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

export const DynamicAdminRaffleScreen = dynamic(
  () => Promise.resolve(AdminRaffleScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
