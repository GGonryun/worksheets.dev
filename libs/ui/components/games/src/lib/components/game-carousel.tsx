import { ArcadeItemCarousel } from '@worksheets/ui/components/arcade';
import { BasicGameInfo } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { Game } from './game';

export const GameCarousel: React.FC<{
  items: BasicGameInfo[];
  title: string;
  action?: ReactNode;
}> = ({ items, title, action }) => {
  return (
    <ArcadeItemCarousel
      items={items}
      title={title}
      action={action}
      render={(item) => <Game {...item} />}
    />
  );
};
