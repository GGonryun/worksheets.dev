import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { InventoryItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

import { ItemInstance } from './item-instance';

const Container: React.FC<{ onClick: (item: InventoryItemSchema) => void }> = ({
  onClick,
}) => {
  const items = trpc.user.inventory.items.useQuery();
  if (items.isLoading || items.isRefetching || items.isFetching)
    return <LoadingBar />;
  if (items.isError) return <ErrorComponent color="text.primary" />;

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
        <ItemInstance
          key={item.itemId}
          {...item}
          onClick={() => onClick(item)}
        />
      ))}
    </Row>
  );
};

export const DynamicItemsGroup = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
