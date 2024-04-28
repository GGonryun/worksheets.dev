import { Box, ButtonBase, Typography } from '@mui/material';
import { Row } from '@worksheets/ui/components/flex';
import { FillImage } from '@worksheets/ui/components/images';
import { toPercentage } from '@worksheets/util/numbers';
import { LootSchema } from '@worksheets/util/types';
import React from 'react';

import { ItemModal } from './modal';

export const Item: React.FC<LootSchema> = (loot) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Row gap={0.5}>
        <Box position="relative" height={20} width={20}>
          <FillImage src={loot.item.imageUrl} alt={loot.item.name} />
        </Box>
        <Typography
          variant="body2"
          fontWeight={500}
          component={ButtonBase}
          onClick={() => setOpen(true)}
          sx={{
            color: (theme) => theme.palette.text.blue.darker,
            '&:hover': {
              color: (theme) => theme.palette.text.blue.darker,
              textDecoration: 'underline',
            },
          }}
        >
          {loot.quantity}x {loot.item.name} ({toPercentage(loot.chance, 1, 2)})
        </Typography>
      </Row>
      <ItemModal open={open} onClose={() => setOpen(false)} loot={loot} />
    </>
  );
};
