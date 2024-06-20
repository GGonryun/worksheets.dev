import { InventoryItem, ItemTypeLogo } from '@worksheets/ui/components/items';
import { InventoryItemSchema } from '@worksheets/util/types';
import React from 'react';

export const ItemInstance: React.FC<
  InventoryItemSchema & { onClick: () => void }
> = ({ onClick, ...item }) => {
  return (
    <InventoryItem
      icon={<ItemTypeLogo {...item} />}
      item={item}
      onClick={onClick}
    />
  );
};
