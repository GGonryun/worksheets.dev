import { ArcadeItemGroup } from '@worksheets/ui/components/arcade';
import { RaffleSchema } from '@worksheets/util/types';
import React, { ReactNode } from 'react';

import { Raffle } from './raffle';

export const RafflesGroup: React.FC<{
  title: ReactNode;
  raffles: RaffleSchema[];
  empty?: ReactNode;
  action?: ReactNode;
}> = ({ title, action, raffles, empty }) => {
  return (
    <ArcadeItemGroup
      title={title}
      action={action}
      empty={empty}
      items={raffles}
      render={(item) => (
        <Raffle
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          expiresAt={item.expiresAt}
          type={item.type}
        />
      )}
    />
  );
};
