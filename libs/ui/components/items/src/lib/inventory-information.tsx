import { InfoOutlined, OfflinePin } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { PaletteColor } from '@worksheets/ui/theme';
import { LootSchema } from '@worksheets/util/types';
import React from 'react';

import { InventoryItem } from './inventory-item';
import { ItemModalLayout, LootDescription } from './item-modal';

export const InventoryInformation: React.FC<{
  loot: LootSchema;
  checked?: boolean;
  size?: number;
  color?: PaletteColor;
  hideChance?: boolean;
  hideQuantity?: boolean;
}> = ({ loot, checked, size = 64, color, hideChance, hideQuantity }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <InventoryItem
        color={color}
        icon={
          checked && (
            <OfflinePin
              color="success"
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white.main',
              }}
            />
          )
        }
        size={size}
        item={{ ...loot, ...loot.item }}
        onClick={() => setOpen(true)}
      />
      <ItemModalLayout
        item={loot.item}
        open={open}
        onClose={() => setOpen(false)}
        content={
          <LootDescription
            hideQuantity={hideQuantity}
            hideChance={hideChance}
            loot={loot}
          />
        }
        action={
          <Button
            fullWidth
            variant="arcade"
            size="small"
            startIcon={<InfoOutlined />}
            href={routes.item.path({ params: { itemId: loot.item.id } })}
          >
            Details
          </Button>
        }
      />
    </>
  );
};
