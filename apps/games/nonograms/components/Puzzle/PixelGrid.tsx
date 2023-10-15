import { Box } from '@mui/material';
import { FC } from 'react';
import { PixelCell } from './PixelCell';
import { bonusBorder } from '../../util';
import {
  NonogramHighlights,
  NonogramPoints,
  NonogramSelections,
  Selection,
} from '../../util/types';
import { Clear } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { highlightColor } from '../../util/styles';

export type PixelGridProps = {
  boxSize: number;
  selections: NonogramSelections;
  highlights: NonogramHighlights;
  points: NonogramPoints;
  onClick: (i: number, j: number) => void;
};

export const PixelGrid: FC<PixelGridProps> = ({
  points,
  selections,
  highlights,
  boxSize,
  onClick,
}) => {
  const theme = useTheme();

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

  return (
    <Box
      sx={{
        border: '3px solid black',
      }}
    >
      {selections.map((row, i) => {
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
                onClick={() => onClick(i, j)}
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
