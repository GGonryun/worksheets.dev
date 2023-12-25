import { FC } from 'react';
import { MixedGridItem, MixedGridItems } from './mixed-grid-items';
import Box from '@mui/material/Box';
import { GRID_ITEM_SIZE } from './util';

export type MixedGridProps = {
  items: MixedGridItem[];
};

export const MixedGrid: FC<MixedGridProps> = ({ items }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(auto-fit, ${GRID_ITEM_SIZE})`}
      gridTemplateRows={`repeat(auto-fit, ${GRID_ITEM_SIZE})`}
      gridAutoFlow={'dense'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={2}
      sx={{
        userSelect: 'none',
      }}
    >
      <MixedGridItems items={items} size={GRID_ITEM_SIZE} />
    </Box>
  );
};
