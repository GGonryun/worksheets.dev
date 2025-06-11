import { ArcadeItemCarousel } from '@worksheets/ui/components/arcade';
import { BasicGameInfo } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { Game } from './game';

export const GameCarousel: React.FC<{
  items: Omit<BasicGameInfo, 'cover'>[];
  title: string;
  action?: ReactNode;
  hideCaption?: boolean;
}> = ({ items, title, action, hideCaption }) => {
  return (
    <ArcadeItemCarousel
      items={items}
      title={title}
      action={action}
      render={(item) => (
        <Game {...item} plays={hideCaption ? undefined : item.plays} />
      )}
    />
  );
};
