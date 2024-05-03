import {
  BattleItemIcon,
  ConsumableItemIcon,
  ExpiringItemIcon,
  HeartItemIcon,
  InventoryItem,
  SellableItemIcon,
  StarItemIcon,
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
          item.expiration.length ? (
            <ExpiringItemIcon size={18} />
          ) : item.type === 'CAPSULE' ? (
            <StarItemIcon size={18} />
          ) : item.type === 'SHARABLE' ? (
            <HeartItemIcon size={18} />
          ) : item.type === 'COMBAT' ? (
            <BattleItemIcon size={18} />
          ) : item.type === 'CONSUMABLE' ? (
            <ConsumableItemIcon size={18} />
          ) : item.type === 'ETCETERA' ? (
            <SellableItemIcon size={18} />
          ) : null
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
