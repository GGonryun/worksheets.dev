import { ArcadeItemGroup } from '@worksheets/ui/components/arcade';
import { PrizeSchema } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { Prize } from './prizes';

const PRIZE_GROUP_PAGE_SIZE = 50;

export const PrizesGroup: React.FC<{
  title: ReactNode;
  prizes: PrizeSchema[];
  action?: ReactNode;
  empty?: ReactNode;
}> = ({ title, action, prizes, empty }) => {
  return (
    <ArcadeItemGroup
      title={title}
      empty={empty}
      action={action}
      items={prizes}
      pageSize={PRIZE_GROUP_PAGE_SIZE}
      render={(item) => (
        <Prize
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          type={item.type}
          monetaryValue={item.monetaryValue}
        />
      )}
    />
  );
};
