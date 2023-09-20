import { Box, styled } from '@mui/material';
import { FC } from 'react';

export type ShapeType =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'trapezoid'
  | 'star'
  // to implement
  | 'diamond'
  | 'hexagon'
  | 'octagon'
  | 'pentagon'
  | 'parallelogram'
  | 'rectangle'
  | 'heart'
  | 'crescent'
  | 'oval'
  | 'semicircle'
  | 'arrow'
  | 'cross'
  | 'infinity';

export type ShapeColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black'
  | 'white';

export type ShapeProps = {
  color: ShapeColor;
  size?: number;
};

const pixels = (size: number) => `${size}px`;

export const Circle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'size',
})<ShapeProps>(({ color, size = 12 }) => ({
  height: pixels(size),
  width: pixels(size),
  borderRadius: '50%',
  display: 'inline-block',
  border: '2px solid black',
  backgroundColor: `${color}`,
}));

export const Square = styled(
  'div',
  {}
)<ShapeProps>(({ color, size = 12 }) => ({
  height: size,
  width: size,
  backgroundColor: `${color}`,
  border: '2px solid black',
}));

// Works best with multiples of 4
export const Triangle: FC<ShapeProps> = ({ size = 12, color }) => (
  // outer container
  <div
    style={{
      position: 'relative',
      width: 0,
      height: 0,
      borderLeft: `${pixels(size / 2 + 3)} solid transparent`,
      borderRight: `${pixels(size / 2 + 3)} solid transparent`,
      borderBottom: `${pixels(size + 6)} solid black`,
    }}
  >
    {/* inner container */}
    <div
      style={{
        position: 'absolute',
        width: pixels(size + 6),
        height: pixels(size + 6),
        marginLeft: -(size / 2 + 3),
        marginTop: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* triangle */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${pixels(size / 2)} solid transparent`,
          borderRight: `${pixels(size / 2)} solid transparent`,
          borderBottom: `${pixels(size)} solid ${color}`,
          boxSizing: 'border-box',
        }}
      />
    </div>
  </div>
);

export const Diamond: FC<ShapeProps> = ({ size = 12, color }) => (
  <Box
    sx={{
      height: pixels(size),
      width: pixels(size),
      backgroundColor: `${color}`,
      border: '2px solid black',
      transform: 'rotate(45deg)',
    }}
  ></Box>
);

const EGG_OFFSET = 0.74285714285;
export const Egg: FC<ShapeProps> = ({ size = 12, color }) => (
  <Box
    sx={{
      display: 'block',
      width: pixels(size * EGG_OFFSET),
      height: pixels(size),
      backgroundColor: `${color}`,
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      border: '2px solid black',
    }}
  />
);
