import { Box } from '@mui/material';
import { Point, convertToPoint } from '@worksheets/util-coordinates';
import { arrayFromLength } from '@worksheets/util/arrays';
import { FC, ReactNode } from 'react';
import {
  MOVEMENT_GRID_WIDTH,
  MOVEMENT_GRID_HEIGHT,
  MOVEMENT_GRID_SIZE,
} from '../util/constants';
import { GridTile } from './GridTile';
import { PlayerColor } from '../util/board';

// a 5x5 grid that shows the possible movement points
export type GameBoardProps = {
  size: number;
  // determines which side of the board is the top
  orientation: PlayerColor;
  onClick: (p: Point) => void;
  renderRedTile: (p: Point) => ReactNode;
  renderBlueTile: (p: Point) => ReactNode;
};

export const GameBoard: FC<GameBoardProps> = ({
  orientation,
  size,
  onClick,
  renderRedTile,
  renderBlueTile,
}) => {
  return (
    <Box
      sx={{
        height: size,
        width: size,
        display: 'grid',
        gridTemplateColumns: `repeat(${MOVEMENT_GRID_HEIGHT}, 1fr)`,
        gridTemplateRows: `repeat(${MOVEMENT_GRID_WIDTH}, 1fr)`,
      }}
    >
      {/* make the tiles */}
      {arrayFromLength(MOVEMENT_GRID_SIZE).map((_, i) => (
        <GridTile
          index={i}
          key={i}
          onClick={() => onClick(convertToPoint(i, MOVEMENT_GRID_WIDTH))}
          point={convertToPoint(i, MOVEMENT_GRID_WIDTH)}
          orientation={orientation}
        >
          {renderRedTile(convertToPoint(i, MOVEMENT_GRID_WIDTH))}
          {renderBlueTile(convertToPoint(i, MOVEMENT_GRID_WIDTH))}
        </GridTile>
      ))}
    </Box>
  );
};
