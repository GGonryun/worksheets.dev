import { Box, Typography, useTheme } from '@mui/material';
import { PixelCell } from './PixelCell';
import { FC } from 'react';
import { bonusBorder, gather, longest } from '../../util/tools';
import {
  NonogramHighlights,
  NonogramPoints,
  NonogramSelections,
} from '../../util/types';
import { completionColor, highlightColor } from '../../util/styles';
import { compareArrays } from '@worksheets/util/arrays';

export type RowHintsProps = {
  boxSize: number;
  hints: number[][];
  selections?: NonogramSelections;
  highlights: NonogramHighlights;
  points: NonogramPoints;
  onClick: (row: number) => void;
};
export const RowHints: FC<RowHintsProps> = ({
  hints: rawHints,
  boxSize,
  onClick,
  selections,
  highlights,
}) => {
  const theme = useTheme();

  const hints = rawHints.map((row) => (!row.length ? [0] : row));
  const width = longest(hints);

  const highlight = (i: number) => {
    if (!selections) return 'none';

    // check if the row is completed.
    const expected = hints[i].filter((hint) => hint > 0);
    // gather the number of selected cells
    const selected = gather(selections[i]);

    if (compareArrays(selected, expected)) {
      return completionColor(theme);
    }

    // check if the entire row is highlighted
    const section = highlights[i];
    if (section && section.every((hint) => hint)) {
      return highlightColor(theme);
    }
    return 'none';
  };

  return (
    <Box
      sx={{
        border: '3px solid black',
        borderRight: 'none',
      }}
    >
      {hints.map((row, i) => (
        <Box
          key={i}
          borderTop={bonusBorder(hints.length, i)}
          onClick={() => onClick(i)}
          sx={{
            backgroundColor: highlight(i),
          }}
        >
          <PixelCell width={boxSize * width * 0.8} height={boxSize}>
            <Box
              display="flex"
              width="100%"
              alignItems="flex-end"
              justifyContent="flex-end"
              pr="4px"
            >
              {row.map((hint, j) => (
                <Typography
                  key={j}
                  sx={{
                    lineHeight: 'unset',
                    fontWeight: 900,
                    width: `0.8lh`,
                    fontSize: boxSize * 0.6,
                  }}
                >
                  {hint}
                  {row.length - 1 !== j ? ',' : ''}
                </Typography>
              ))}
            </Box>
          </PixelCell>
        </Box>
      ))}
    </Box>
  );
};
