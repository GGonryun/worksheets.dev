import { ArcadeItemGroup } from '@worksheets/ui/components/arcade';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { RaffleSchema } from '@worksheets/util/types';
import React, { ReactNode } from 'react';

import { Raffle } from './raffle';

export const RafflesGroup: React.FC<{
  title: ReactNode;
  raffles?: RaffleSchema[];
  empty?: ReactNode;
  action?: ReactNode;
}> = ({ title, action, raffles, empty }) => {
  return (
    <ArcadeItemGroup
      title={title}
      action={action}
      empty={empty}
      items={raffles}
      render={(item) => <Raffle key={item.id} {...item} />}
      placeholder={<LoadingBar />}
    />
  );
};
