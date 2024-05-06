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

export const ItemInstance: React.FC<
  InventoryItemSchema & { onClick: () => void }
> = ({ onClick, ...item }) => {
  return (
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
      onClick={onClick}
    />
  );
};
