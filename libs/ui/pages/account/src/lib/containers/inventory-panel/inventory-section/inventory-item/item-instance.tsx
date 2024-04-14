import { alpha, Box, Typography } from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';
import { shorthandNumber } from '@worksheets/util/numbers';
import { InventoryItem } from '@worksheets/util/types';
import React from 'react';

import { ExpiringItemIcon } from './expiring-item-icon';
import { DynamicItemModal } from './item-modal';

export const ItemInstance: React.FC<InventoryItem> = (item) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          position: 'relative',
          borderRadius: (theme) => theme.shape.borderRadius / 2,
          border: (theme) =>
            `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          p: 0.25,
          width: 'fit-content',
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          cursor: 'pointer',
        }}
      >
        {item.expiresAt && <ExpiringItemIcon />}
        <Box
          sx={{
            height: 72,
            width: 72,
            position: 'relative',
          }}
        >
          <FillImage src={item.imageUrl} alt={item.name} />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 2,
            right: 2,
          }}
        >
          <Typography
            lineHeight={1}
            fontWeight={900}
            sx={{
              WebkitTextStroke: '1px',
              WebkitTextStrokeColor: '#DDDDDD',
            }}
          >
            {shorthandNumber(item.quantity)}
          </Typography>
        </Box>
      </Box>
      <DynamicItemModal
        open={open}
        item={item}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
