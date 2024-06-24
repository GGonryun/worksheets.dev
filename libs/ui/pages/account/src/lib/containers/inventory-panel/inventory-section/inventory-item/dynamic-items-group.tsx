import { Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { InventoryItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';

import { ItemInstance } from './item-instance';

const Container: React.FC<{
  onClick: (itemId: string) => void;
  dirty: string[];
  items: InventoryItemSchema[];
  isLoading: boolean;
}> = ({ onClick, dirty, items, isLoading }) => {
  if (isLoading) return <LoadingBar />;

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
      {items.map((item) => (
        <ItemInstance
          dirty={dirty.includes(item.itemId)}
          key={item.itemId}
          {...item}
          onClick={() => onClick(item.itemId)}
        />
      ))}
    </Row>
  );
};

export const DynamicItemsGroup = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
