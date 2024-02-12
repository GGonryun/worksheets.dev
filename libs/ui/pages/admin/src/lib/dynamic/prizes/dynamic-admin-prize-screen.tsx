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

const AdminPrizeScreen: React.FC<{ prizeId: number }> = ({ prizeId }) => {
  const prize = trpc.admin.prizes.find.useQuery({
    prizeId,
  });

  if (prize.isLoading) return <LoadingScreen />;
  if (prize.error) return <ErrorScreen message={prize.error.message} />;

  return (
    <CustomContainer>
      <ListButton href="/admin/prizes">All Prizes</ListButton>
      <CustomPaper title={`Prize Details`}>
        <DataPair
          label="ID"
          value={prize.data.prizeId}
          href={`/prizes/${prize.data.prizeId}`}
        />
        <DataPair label="Name" value={prize.data.name} />
        <DataPair label="Description" value={prize.data.description} />
        <DataPair
          label="Created At"
          value={printShortDateTime(prize.data.createdAt)}
        />
        <DataPair
          label="Updated At"
          value={printShortDateTime(prize.data.updatedAt)}
        />

        <DataGroup
          label="Raffles"
          items={prize.data.raffles}
          builder={(raffle) => ({
            key: raffle.raffleId,
            label: `Raffle ID`,
            value: `${raffle.raffleId} (${raffle.participants} participants)`,
            href: `/admin/raffles/${raffle.raffleId}`,
          })}
        />

        <DataGroup
          label="Winners"
          items={prize.data.winners}
          builder={(winner) => ({
            key: winner.winnerId,
            label: `Winner ID`,
            value: winner.winnerId,
            href: `/admin/winners/${winner.winnerId}`,
          })}
        />

        <DataGroup
          label="Codes"
          items={prize.data.codes}
          builder={(code) => ({
            key: code.codeId,
            label: `Code ID`,
            value: code.codeId,
            href: `/admin/codes/${code.codeId}`,
          })}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

export const DynamicAdminPrizeScreen = dynamic(
  () => Promise.resolve(AdminPrizeScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
