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

const AdminReportScreen: React.FC<{ reportId: string }> = ({ reportId }) => {
  const report = trpc.admin.reports.find.useQuery({
    reportId,
  });

  if (report.isLoading) return <LoadingScreen />;
  if (report.error) return <ErrorScreen message={report.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.reports.path()}>All Reports</ListButton>
      <CustomPaper title={`Report Details`}>
        <DataPair label="Report ID" value={report.data.reportId} />
        <DataPair
          label="Game ID"
          value={report.data.gameId}
          href={routes.admin.game.path({
            params: {
              gameId: report.data.gameId,
            },
          })}
        />
        <DataPair label="Reason" value={report.data.reason} />
        <DataPair label="Text" value={report.data.text} />
        <DataPair
          label="Created At"
          value={printShortDateTime(report.data.createdAt)}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

export const DynamicAdminReportScreen = dynamic(
  () => Promise.resolve(AdminReportScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
