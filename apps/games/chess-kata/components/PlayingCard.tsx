import { Box, Typography } from '@mui/material';
import { Point, areEqual, convertToPoint } from '@worksheets/util-coordinates';
import { arrayFromLength } from '@worksheets/util/arrays';

import { FC } from 'react';
import {
  MOVEMENT_GRID_WIDTH,
  MOVEMENT_GRID_HEIGHT,
  MOVEMENT_GRID_SIZE,
} from '../util/constants';
import {
  PlayingCardType,
  PLAYING_CARD_MOVEMENT,
  PLAYING_CARD_TITLE,
  CENTER_POINT,
} from '../util/playing-cards';
import { CSS_COLOR, PlayerColor } from '../util/board';

export type PlayingCardProps = {
  type: PlayingCardType;
  size: number;
  player: PlayerColor;
  onClick?: () => void;
  flipped?: boolean;
  pending?: boolean;
};

export const PlayingCard: FC<PlayingCardProps> = ({
  type,
  size,
  player,
  flipped,
  pending,
  onClick,
}) => {
  // we'll use the id to determine which card to render
  const movementPoints = PLAYING_CARD_MOVEMENT[type];
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: 1,
        border: '1px solid black',
        display: 'flex',
        flexDirection: flipped ? 'column-reverse' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pending ? 'darkgrey' : 'white',
        gap: 0.5,
        height: size,
        width: size,
      }}
    >
      <Typography fontSize={0.15 * size}>{PLAYING_CARD_TITLE[type]}</Typography>
      <MovementGrid
        player={player}
        flipped={flipped}
        points={movementPoints}
        size={size / 1.8}
      />
      <Typography fontSize={0.12 * size}>
        <i>{pending ? '(Played)' : ''}</i>
      </Typography>
    </Box>
  );
};

type MovementGridProps = {
  points: Point[];
  size: number;
  player: PlayerColor;
  flipped?: boolean;
};

// the movement grid is a 5x5 grid that shows the possible movement points
export const MovementGrid: FC<MovementGridProps> = ({
  points,
  size,
  player,
  flipped,
}) => {
  const pickColor: (point: Point) => string = (point) => {
    // center point is always white.
    if (areEqual(point, CENTER_POINT)) {
      return 'white';
    }
    if (points.some((p) => areEqual(p, point))) {
      return CSS_COLOR[player];
    }

    return 'lightgrey';
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${MOVEMENT_GRID_WIDTH}, 1fr)`,
        gridTemplateRows: `repeat(${MOVEMENT_GRID_HEIGHT}, 1fr)`,
        height: size,
        width: size,
      }}
    >
      {arrayFromLength(MOVEMENT_GRID_SIZE).map((i) => (
        <Box
          key={i}
          sx={{
            order: (flipped ? -1 : 1) * i,
            border: '1px solid black',
            margin: '-1px',
            backgroundColor: pickColor(convertToPoint(i, MOVEMENT_GRID_WIDTH)),
          }}
        />
      ))}
    </Box>
  );
};
