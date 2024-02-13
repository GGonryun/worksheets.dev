import { ArcadeItemCarousel } from '@worksheets/ui/components/arcade';
import { PrizeSchema } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { Prize } from './prizes';

export const PrizesCarousel: React.FC<{
  prizes: PrizeSchema[];
  title: string;
  action?: ReactNode;
}> = ({ prizes, title, action }) => {
  return (
    <ArcadeItemCarousel
      items={prizes}
      title={title}
      action={action}
      render={(item) => <Prize {...item} />}
    />
  );
};
