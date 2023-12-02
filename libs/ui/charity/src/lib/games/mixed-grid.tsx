import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { MixedGridItem, MixedGridItems } from './mixed-grid-items';

export type MixedGridProps = {
  items: MixedGridItem[];
};

export const MixedGrid: FC<MixedGridProps> = ({ items }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const itemSize = () => {
    if (matches) return '94px';
    return '80px';
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
      gap={1}
    >
      <MixedGridItems items={items} size={size} />
    </Box>
  );
};
