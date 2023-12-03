import { Box } from '@mui/material';
import { FC, Fragment } from 'react';
import { GameIconProps, GameIcon } from './game-icon';
import {
  AdvertisementPill,
  AdvertisementPillProps,
  CategoryPill,
  CategoryPillProps,
  ImagePill,
  ImagePillProps,
  ProgressPill,
  ProgressPillProps,
  TextPill,
  TextPillProps,
} from '@worksheets/ui/pills';

export const GRID_ITEM_SIZE = `94px`;

export type MixedGridItem =
  | (GameIconProps & { type: 'game'; span?: number })
  | (CategoryPillProps & { type: 'category' })
  | (TextPillProps & { type: 'text' })
  | (ProgressPillProps & { type: 'progress' })
  | (ImagePillProps & { type: 'image' })
  | (AdvertisementPillProps & { type: 'advertisement'; span?: number });

export type MixedGridItemProps = {
  items: MixedGridItem[];
  size: string;
};

export const MixedGridItems: FC<MixedGridItemProps> = ({ items, size }) => {
  return (
    <>
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
          {item.type === 'progress' && (
            <Box
              key={item.current}
              gridColumn={{ xs: `span 2`, sm: `span 3` }}
              gridRow={`span 1`}
              height={size}
            >
              <ProgressPill {...item} />
            </Box>
          )}
          {item.type === 'image' && (
            <Box
              key={item.alt}
              gridColumn={{ xs: `span 2`, sm: `span 3` }}
              gridRow={`span 1`}
              height={size}
            >
              <ImagePill {...item} />
            </Box>
          )}
          {item.type === 'advertisement' && (
            <Box
              key={index}
              gridColumn={`span ${item.span ?? 2}`}
              gridRow={`span ${item.span ?? 2}`}
            >
              <AdvertisementPill {...item} />
            </Box>
          )}
        </Fragment>
      ))}
    </>
  );
};
