import { ArcadeItemGroup } from '@worksheets/ui/components/arcade';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { ContestSchema } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { ContestItem } from './contest-item';

export const ContestGroup: React.FC<{
  title: ReactNode;
  contests?: ContestSchema[];
  empty?: ReactNode;
  action?: ReactNode;
}> = ({ title, action, contests, empty }) => {
  return (
    <ArcadeItemGroup
      title={title}
      action={action}
      empty={empty}
      items={contests}
      render={(item) => <ContestItem key={item.id} {...item} />}
      placeholder={<LoadingBar />}
    />
  );
};
