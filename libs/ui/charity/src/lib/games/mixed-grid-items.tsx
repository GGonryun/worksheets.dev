import { Box } from '@mui/material';
import { FC, Fragment } from 'react';
import { GameIconProps, GameIcon } from './game-icon';
import {
  CategoryPillProps,
  CategoryPill,
  TextPillProps,
  TextPill,
} from '../pills';

export const GRID_ITEM_SIZE = `94px`;

export type MixedGridItem =
  | (GameIconProps & { type: 'game'; span?: number })
  | (CategoryPillProps & { type: 'category' })
  | (TextPillProps & { type: 'text' });

export type MixedGridItemProps = {
  items: MixedGridItem[];
  size: string;
};

export const MixedGridItems: FC<MixedGridItemProps> = ({ items, size }) => {
  return (
    <>
      {items.map((item) => (
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
            <Box
              key={item.id}
              gridColumn={`span 3`}
              gridRow={`span 1`}
              height={size}
            >
              <CategoryPill {...item} />
            </Box>
          )}
          {item.type === 'text' && (
            <Box
              key={item.text}
              gridColumn={`span 3`}
              gridRow={`span 1`}
              height={size}
            >
              <TextPill {...item} />
            </Box>
          )}
        </Fragment>
      ))}
    </>
  );
};
