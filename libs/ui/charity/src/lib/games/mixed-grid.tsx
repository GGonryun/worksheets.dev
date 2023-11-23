import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC, Fragment } from 'react';
import { GameIcon, GameIconProps } from './game-icon';
import { CategoryPill, CategoryPillProps } from './category-pill';

type MixedGridItems =
  | (GameIconProps & { type: 'game'; span?: number })
  | (CategoryPillProps & { type: 'category' });

export type MixedGridProps = {
  items: MixedGridItems[];
};

export const MixedGrid: FC<MixedGridProps> = ({ items }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const itemSize = () => {
    if (matches) return '94px';
    return '80px';
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(auto-fit, ${itemSize()})`}
      gridTemplateRows={`repeat(auto-fit, ${itemSize()})`}
      gridAutoFlow={'dense'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={2}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'game' && (
            <Box
              key={item.id}
              gridColumn={`span ${item.span ?? 1}`}
              gridRow={`span ${item.span ?? 1}`}
            >
              <GameIcon {...item} />
            </Box>
          )}
          {item.type === 'category' && (
            <Box key={item.id} gridColumn={`span 3`} gridRow={`span 1`}>
              <CategoryPill height={itemSize()} {...item} />
            </Box>
          )}
        </Fragment>
      ))}
    </Box>
  );
};
