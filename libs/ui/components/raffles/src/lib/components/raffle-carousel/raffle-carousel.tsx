import { PrizeType, RaffleStatus } from '@prisma/client';
import { ArcadeItemCarousel } from '@worksheets/ui/components/arcade';
import { ReactNode } from 'react';

import { Raffle } from '../raffle';

export const RaffleCarousel: React.FC<{
  items: {
    id: number;
    name: string;
    imageUrl: string;
    status: RaffleStatus;
    expiresAt: number;
    type: PrizeType;
  }[];
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
          status={item.status}
          name={item.name}
          imageUrl={item.imageUrl}
          expiresAt={item.expiresAt}
          type={item.type}
        />
      )}
    />
  );
};
