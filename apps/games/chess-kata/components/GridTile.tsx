import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { BOT_SHRINE, PlayerColor, TOP_SHRINE } from '../util/board';
import { Point, areEqual } from '@worksheets/util-coordinates';

export const GridTile: FC<{
  children: ReactNode;
  point: Point;
  orientation: PlayerColor;
  index: number;
  onClick: () => void;
}> = ({ onClick, children, point, orientation, index }) => {
  const getBackgroundColor = () => {
    // is top center point
    if (areEqual(point, TOP_SHRINE)) {
      return 'lightpink';
    } else if (areEqual(point, BOT_SHRINE)) {
      return 'lightblue';
    } else {
      return '#F8F8F8';
    }
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        order: (orientation === PlayerColor.Blue ? 1 : -1) * index,
        borderRadius: 2,
        border: '1px solid black',
        margin: '-1px',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: getBackgroundColor(),
      }}
    >
      {children}
    </Box>
  );
};
