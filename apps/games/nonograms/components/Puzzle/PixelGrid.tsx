import { Box } from '@mui/material';
import { FC } from 'react';
import { PixelCell } from './PixelCell';
import { bonusBorder } from '../../util/tools';
import {
  NonogramHighlights,
  NonogramPoints,
  NonogramSelections,
  Selection,
} from '../../util/types';
import { Clear } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { highlightColor } from '../../util/styles';
import { useComponentSize } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { GeneratedNonogram } from '@worksheets/ui-games';

export type PixelGridProps = {
  nonogram: GeneratedNonogram;
  boxSize: number;
  selections?: NonogramSelections;
  highlights: NonogramHighlights;
  points: NonogramPoints;
  onClick: (i: number, j: number) => void;
  onPanStart: (i: number, j: number) => void;
  onPanEnd: (i: number, j: number) => void;
  onPan: (i: number, j: number) => void;
};

export const PixelGrid: FC<PixelGridProps> = ({
  nonogram,
  points,
  selections,
  highlights,
  boxSize,
  onClick,
  onPanStart,
  onPanEnd,
  onPan,
}) => {
  const theme = useTheme();
  const { ref, dimensions } = useComponentSize();

  const suggestedSizing = () => {
    if (boxSize < 24) return boxSize - 2;
    if (boxSize < 40) return boxSize - 4;
    return boxSize - 6;
  };

  const suggestedBordering = () => {
    if (boxSize < 24) return 1;
    if (boxSize < 40) return 2;
    return 3;
  };

  const highlight = (i: number, j: number) => {
    return highlights[i][j]
      ? highlightColor(theme)
      : theme.palette.background.default;
  };

  const active = (i: number, j: number) => {
    return points[i][j]
      ? `${suggestedBordering()}px solid ${theme.palette.success.main}`
      : 'none';
  };

  const pseudoGrid = () => {
    // this is a hack to get positions of the grid to work
    // with the motion library despite having borders and padding
    const sizes: number[] = nonogram.solution?.map((_, i) => boxSize + 1) ?? [];
    // every fourth row gets a bonus border
    // to simulate the grid
    sizes.forEach((_, i) => {
      if (i % 4 === 0) sizes[i] += 2;
    });

    // accumulate the widths across the rows
    // so that we can use them to calculate the position of the grid
    const points = sizes.reduce(
      (acc, curr) => {
        const last = acc[acc.length - 1];
        acc.push(last + curr);
        return acc;
      },
      [0]
    );

    return points;
  };

  const getPoints = (clientX: number, clientY: number) => {
    const offsetX = clientX - dimensions.x;
    const offsetY = clientY - dimensions.y;
    const points = pseudoGrid();
    // find which point the click is closest to
    const i = points.findIndex((point) => point > offsetY) - 1;
    const j = points.findIndex((point) => point > offsetX) - 1;
    return { i, j };
  };

  return (
    <Box
      ref={ref}
      sx={{
        border: '3px solid black',
      }}
    >
      <motion.div
        onPanStart={(e) => {
          const { i, j } = getPoints(e.clientX, e.clientY);
          onPanStart(i, j);
        }}
        onPanEnd={(e) => {
          const { i, j } = getPoints(e.clientX, e.clientY);
          onPanEnd(i, j);
        }}
        onPan={(e) => {
          const { i, j } = getPoints(e.clientX, e.clientY);
          onPan(i, j);
        }}
        onClick={(e) => {
          const { i, j } = getPoints(e.clientX, e.clientY);
          onClick(i, j);
        }}
        style={{
          position: 'absolute',
          height: dimensions.height - 4,
          width: dimensions.width - 4,
        }}
      />
      {selections?.map((row, i) => {
        return (
          <Box
            key={i}
            sx={{
              display: 'flex',
              borderTop: bonusBorder(selections.length, i),
            }}
          >
            {row.map((pixel, j) => (
              <Box
                key={j}
                borderLeft={bonusBorder(selections.length, j)}
                sx={{
                  backgroundColor: highlight(i, j),
                }}
              >
                <PixelCell height={boxSize} width={boxSize}>
                  <Box
                    sx={{
                      border: active(i, j),
                      display: 'grid',
                      placeItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    {pixel === Selection.Square && (
                      <SquarePoint size={suggestedSizing()} />
                    )}
                    {pixel === Selection.Empty && (
                      <SquarePoint size={suggestedSizing()} empty />
                    )}
                    {pixel === Selection.Cross && (
                      <CrossPoint size={suggestedSizing()} />
                    )}
                  </Box>
                </PixelCell>
              </Box>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

export const SquarePoint: FC<{ size: number; empty?: boolean }> = ({
  size,
  empty,
}) => {
  return (
    <Box
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: empty ? 'transparent' : 'black',
      }}
    />
  );
};

export const CrossPoint: FC<{ size: number }> = ({ size }) => {
  const theme = useTheme();
  return <Clear sx={{ fontSize: size, color: theme.palette.text.primary }} />;
};
