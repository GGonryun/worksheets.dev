import { Box } from '@mui/material';
import { FC, Fragment } from 'react';
import { CategoryPillProps, CategoryPill } from './category-pill';
import { GameIconProps, GameIcon } from './game-icon';

export const GRID_ITEM_SIZE = `94px`;

export type MixedGridItem =
  | (GameIconProps & { type: 'game'; span?: number })
  | (CategoryPillProps & { type: 'category' });

export type MixedGridItemProps = {
  items: MixedGridItem[];
};

export const MixedGridItems: FC<MixedGridItemProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Fragment>
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
              <CategoryPill height={GRID_ITEM_SIZE} {...item} />
            </Box>
          )}
        </Fragment>
      ))}
    </>
  );
};
