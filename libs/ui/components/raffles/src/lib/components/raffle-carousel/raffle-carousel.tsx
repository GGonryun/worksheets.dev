import { ArcadeItemCarousel } from '@worksheets/ui/components/arcade';
import { BasicRaffleDetails } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { Raffle } from '../raffle';

export const RaffleCarousel: React.FC<{
  items: BasicRaffleDetails[];
  title: string;
  action?: ReactNode;
}> = ({ items, title, action }) => {
  return (
    <ArcadeItemCarousel
      items={items}
      title={title}
      action={action}
      render={(item) => <Raffle {...item} />}
    />
  );
};
