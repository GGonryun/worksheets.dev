import {
  BattleItemIcon,
  ConsumableItemIcon,
  ExpiringItemIcon,
  HeartItemIcon,
  InventoryItem,
  QuestionMarkIcon,
  SellableItemIcon,
  ShuffleItemIcon,
} from '@worksheets/ui/components/items';
import { assertNever } from '@worksheets/util/errors';
import { InventoryItemSchema } from '@worksheets/util/types';
import React from 'react';

export const ItemLogo: React.FC<InventoryItemSchema> = (item) => {
  if (item.expiration.length) {
    return <ExpiringItemIcon size={18} />;
  }

  switch (item.type) {
    case 'STEAM_KEY':
    case 'CURRENCY':
      return null;
    case 'CONSUMABLE':
      return <ConsumableItemIcon size={18} />;
    case 'SHARABLE':
      return <HeartItemIcon size={18} />;
    case 'CAPSULE':
      return <ShuffleItemIcon size={18} />;
    case 'COMBAT':
      return <BattleItemIcon size={18} />;
    case 'ETCETERA':
      return <SellableItemIcon size={18} />;
    case 'PRIZE_WHEEL':
      return <QuestionMarkIcon size={18} />;
    default:
      throw assertNever(item.type);
  }
};

export const ItemInstance: React.FC<
  InventoryItemSchema & { onClick: () => void }
> = ({ onClick, ...item }) => {
  return (
    <InventoryItem
      icon={<ItemLogo {...item} />}
      item={item}
      onClick={onClick}
    />
  );
};
