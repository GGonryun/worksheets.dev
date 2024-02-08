import { ArcadeItemCarousel } from '@worksheets/ui/components/arcade';
import { RaffleSchema } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { Raffle } from '../raffle';

export const RaffleCarousel: React.FC<{
  items: RaffleSchema[];
  title: string;
  action?: ReactNode;
}> = ({ items, title, action }) => {
  return (
    <ArcadeItemCarousel
      items={items}
      title={title}
      action={action}
      render={(item) => (
        <Raffle
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
