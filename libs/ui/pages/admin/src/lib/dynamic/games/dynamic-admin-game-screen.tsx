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

const AdminGameScreen: React.FC<{ gameId: string }> = ({ gameId }) => {
  const game = trpc.admin.games.find.useQuery({
    gameId,
  });

  if (game.isLoading) return <LoadingScreen />;
  if (game.error) return <ErrorScreen message={game.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.games.path()}>All Games</ListButton>
      <CustomPaper title={`Game Details`}>
        <DataPair
          label="Game ID"
          value={game.data.gameId}
          href={routes.admin.game.path({
            params: {
              gameId: game.data.gameId,
            },
          })}
        />
        <DataPair label="Status" value={game.data.status} />
        <DataPair label="Title" value={game.data.title} />
        <DataPair label="Description" value={game.data.description} />
        <DataPair label="Plays" value={game.data.plays} />
        <DataPair label="Likes" value={game.data.likes} />
        <DataPair label="Dislikes" value={game.data.dislikes} />
        <DataPair
          label="Created At"
          value={printShortDateTime(game.data.createdAt)}
        />
        <DataPair
          label="Updated At"
          value={printShortDateTime(game.data.updatedAt)}
        />

        <DataGroup
          label="Reports"
          items={game.data.reports}
          builder={(report) => ({
            key: report.reportId,
            label: report.reason,
            value: report.reportId,
            href: routes.admin.report.path({
              params: {
                reportId: report.reportId,
              },
            }),
          })}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

export const DynamicAdminGameScreen = dynamic(
  () => Promise.resolve(AdminGameScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
