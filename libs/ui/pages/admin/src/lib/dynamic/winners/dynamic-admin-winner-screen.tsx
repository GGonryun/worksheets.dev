import { Typography } from '@mui/material';
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

const AdminWinnerScreen: React.FC<{ winnerId: string }> = ({ winnerId }) => {
  const winner = trpc.admin.winners.find.useQuery({
    winnerId,
  });

  if (winner.isLoading) return <LoadingScreen />;
  if (winner.error) return <ErrorScreen message={winner.error.message} />;

  return (
    <CustomContainer>
      <ListButton href="/admin/winners">All Winners</ListButton>
      <CustomPaper title={`Winner Details`}>
        <DataPair label="ID" value={winner.data.winnerId} />
        <DataPair
          label="Raffle ID"
          value={winner.data.raffleId}
          href={`/admin/raffles/${winner.data.raffleId}`}
        />

        <DataPair
          label="Prize ID"
          value={winner.data.prizeId}
          href={`/admin/prizes/${winner.data.prizeId}`}
        />
        <DataPair
          label="Participation ID"
          value={winner.data.participationId}
        />
        <DataPair
          label="Code ID"
          value={winner.data.codeId}
          href={`/admin/codes/${winner.data.codeId}`}
        />
        <DataPair
          label="User ID"
          value={winner.data.userId}
          href={`/admin/users/${winner.data.userId}`}
        />
        <DataPair
          label="Created At"
          value={printShortDateTime(winner.data.createdAt)}
        />

        <DataPair
          label="Claimed At"
          value={
            winner.data.claimedAt
              ? printShortDateTime(winner.data.claimedAt)
              : 'Not Claimed'
          }
        />

        {winner.data.alert && (
          <>
            <Typography variant="h6">Claim Alert</Typography>
            <br />
            <DataPair label="Alert ID" value={winner.data.alert.alertId} />
            <DataPair
              label="Created At"
              value={printShortDateTime(winner.data.alert.createdAt)}
            />
            <DataPair label="Sent Count" value={winner.data.alert.sentCount} />
            <DataPair
              label="Last Sent"
              value={
                winner.data.alert.lastSentAt
                  ? printShortDateTime(winner.data.alert.lastSentAt)
                  : 'Alert Not Sent Yet'
              }
            />
          </>
        )}
      </CustomPaper>
    </CustomContainer>
  );
};

export const DynamicAdminWinnerScreen = dynamic(
  () => Promise.resolve(AdminWinnerScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
