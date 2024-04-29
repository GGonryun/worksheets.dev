import {
  ExpiringItemIcon,
  InventoryItem,
} from '@worksheets/ui/components/items';
import { InventoryItemSchema } from '@worksheets/util/types';
import React from 'react';

import { DynamicItemModal } from './dynamic-item-modal';

export const ItemInstance: React.FC<InventoryItemSchema> = (item) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <InventoryItem
        icon={
          item.expiration.length ? <ExpiringItemIcon size={18} /> : undefined
        }
        item={item}
        onClick={() => setOpen(true)}
      />
      <DynamicItemModal
        open={open}
        item={item}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
