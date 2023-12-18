import { FC } from 'react';
import { MixedGridItem, MixedGridItems } from './mixed-grid-items';
import Box from '@mui/material/Box';

export type MixedGridProps = {
  items: MixedGridItem[];
};

export const MixedGrid: FC<MixedGridProps> = ({ items }) => {
  const itemSize = () => {
    return '90px';
  };

  const size = itemSize();

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(auto-fit, ${size})`}
      gridTemplateRows={`repeat(auto-fit, ${size})`}
      gridAutoFlow={'dense'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={1.5}
      sx={{
        userSelect: 'none',
      }}
    >
      <MixedGridItems items={items} size={size} />
    </Box>
  );
};
