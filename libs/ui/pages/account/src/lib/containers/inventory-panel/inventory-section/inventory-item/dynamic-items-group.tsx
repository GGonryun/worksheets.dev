import { trpc } from '@worksheets/trpc-charity';
import { Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import dynamic from 'next/dynamic';

import { ItemInstance } from './item-instance';

const Container: React.FC = () => {
  const items = trpc.user.inventory.items.useQuery(undefined);
  if (!items.data) return <LoadingBar />;

  return (
    <Row
      flexWrap="wrap"
      gap={1}
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius,
        backgroundColor: (theme) => theme.palette.grey[200],
        p: 1.5,
      }}
    >
      {items.data.map((item) => (
        <ItemInstance key={item.itemId} {...item} />
      ))}
    </Row>
  );
};

export const DynamicItemsGroup = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
