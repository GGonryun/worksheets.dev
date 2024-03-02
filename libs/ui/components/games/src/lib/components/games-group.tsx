import { ArcadeItemGroup } from '@worksheets/ui/components/arcade';
import { BasicGameInfo } from '@worksheets/util/types';
import React, { ReactNode } from 'react';

import { Game } from './game';

export const GamesGroup: React.FC<{
  title?: ReactNode;
  pageSize?: number;
  header?: ReactNode;
  games: BasicGameInfo[];
  empty?: ReactNode;
  footer?: ReactNode;
  action?: ReactNode;
}> = ({ title, pageSize, header, action, games, footer, empty }) => {
  return (
    <ArcadeItemGroup
      pageSize={pageSize}
      title={title}
      footer={footer}
      header={header}
      action={action}
      empty={empty}
      items={games}
      render={(item) => <Game {...item} />}
    />
  );
};
