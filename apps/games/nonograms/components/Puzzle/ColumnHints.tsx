import { Box, Typography, useTheme } from '@mui/material';
import { PixelCell } from './PixelCell';
import { FC } from 'react';
import { bonusBorder, gather, getColumn, longest } from '../../util';
import {
  NonogramHighlights,
  NonogramPoints,
  NonogramSelections,
} from '../../util/types';
import { completionColor, highlightColor } from '../../util/styles';
import { compareArrays } from '@worksheets/util/arrays';

export type ColumnHintsProps = {
  hints: number[][];
  boxSize: number;
  selections: NonogramSelections;
  highlights: NonogramHighlights;
  points: NonogramPoints;
  onClick: (column: number) => void;
};
export const ColumnHints: FC<ColumnHintsProps> = ({
  hints: rawHints,
  boxSize,
  selections,
  onClick,
  highlights,
}) => {
  const theme = useTheme();

  const height = longest(rawHints);
  const hints = rawHints.map((col) => (!col.length ? [0] : col));

  const highlight = (i: number) => {
    // check if the row is completed.
    // add up the number of expected cells
    const expected = hints[i].filter((hint) => hint);
    // add up the number of selected cells
    const selected = gather(getColumn(selections, i));

    if (compareArrays(selected, expected)) {
      return completionColor(theme);
    }

    // check if the entire row is highlighted
    const section = getColumn(highlights, i);
    if (section && section.every((hint) => hint)) {
      return highlightColor(theme);
    }
    return 'none';
  };

  return (
    <Box
      display="flex"
      sx={{
        border: '3px solid black',
        borderBottom: 'none',
      }}
    >
      {hints.map((column, i) => (
        <Box
          key={i}
          borderLeft={bonusBorder(hints.length, i)}
          onClick={() => onClick(i)}
          sx={{
            backgroundColor: highlight(i),
          }}
        >
          <PixelCell height={boxSize * (height * 0.75)} width={boxSize}>
            <Box
              display="flex"
              height="100%"
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="flex-end"
              mt={'-2px'}
            >
              {column.map((hint, j) => (
                <Typography
                  key={j}
                  sx={{
                    lineHeight: 'unset',
                    fontWeight: 900,
                    width: `${boxSize}px`,
                    fontSize: boxSize * 0.6,
                  }}
                >
                  {hint}
                </Typography>
              ))}
            </Box>
          </PixelCell>
        </Box>
      ))}
    </Box>
  );
};
