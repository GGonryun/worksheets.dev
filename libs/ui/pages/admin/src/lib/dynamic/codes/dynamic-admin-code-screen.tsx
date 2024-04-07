import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import dynamic from 'next/dynamic';
import React from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { DataPair } from '../../shared/data-pair';
import { ListButton } from '../../shared/list-button';

const AdminCodeScreen: React.FC<{ codeId: string }> = ({ codeId }) => {
  const code = trpc.admin.codes.find.useQuery({
    codeId,
  });

  if (code.isLoading) return <LoadingScreen />;
  if (code.error) return <ErrorScreen message={code.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.codes.path()}>All Codes</ListButton>
      <CustomPaper title={`Code Details`}>
        <DataPair label="ID" value={code.data.codeId} />
        <DataPair
          label="Prize ID"
          value={code.data.prizeId}
          href={routes.admin.prize.path({
            params: { prizeId: code.data.prizeId },
          })}
        />
        <DataPair
          label="Raffle ID"
          value={code.data.raffleId ?? 'N/A'}
          href={
            code.data.raffleId
              ? routes.admin.raffle.path({
                  params: { raffleId: code.data.raffleId },
                })
              : undefined
          }
        />
        <DataPair
          label="Winner ID"
          value={code.data.winnerId ?? 'N/A'}
          href={
            code.data.winnerId
              ? routes.admin.winner.path({
                  params: { winnerId: code.data.winnerId },
                })
              : undefined
          }
        />
        <DataPair
          label="Created At"
          value={printShortDateTime(code.data.createdAt)}
        />
        <DataPair
          label="Updated At"
          value={printShortDateTime(code.data.updatedAt)}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

export const DynamicAdminCodeScreen = dynamic(
  () => Promise.resolve(AdminCodeScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
