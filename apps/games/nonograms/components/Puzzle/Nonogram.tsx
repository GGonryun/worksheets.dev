import { Box } from '@mui/material';
import { GeneratedNonogram, borderRadius } from '@worksheets/ui-games';
import { ColumnHints } from './ColumnHints';
import { PixelGrid } from './PixelGrid';
import { RowHints } from './RowHints';
import { FC } from 'react';
import { boxShadow } from '../../util/styles';
import {
  NonogramHighlights,
  NonogramObject,
  NonogramPoints,
  NonogramSelections,
} from '../../util/types';

export type NonogramProps = {
  size: number;
  nonogram: GeneratedNonogram;
  selections: NonogramSelections;
  highlights: NonogramHighlights;
  points: NonogramPoints;
  onClick: (i: number, j: number, o: NonogramObject) => void;
};
export const Nonogram: FC<NonogramProps> = ({
  size,
  nonogram,
  selections,
  highlights,
  points,
  onClick,
}) => {
  return (
    <Box
      className="puzzle"
      sx={{
        mt: 8,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        padding: 2,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
      }}
    >
      <RowHints
        boxSize={size}
        hints={nonogram.rows}
        highlights={highlights}
        selections={selections}
        points={points}
        onClick={(row: number) => onClick(row, -1, NonogramObject.Row)}
      />
      <Box>
        <ColumnHints
          boxSize={size}
          hints={nonogram.columns}
          selections={selections}
          highlights={highlights}
          points={points}
          onClick={(column: number) =>
            onClick(-1, column, NonogramObject.Column)
          }
        />
        <PixelGrid
          boxSize={size}
          highlights={highlights}
          selections={selections}
          points={points}
          onClick={(row: number, column: number) =>
            onClick(row, column, NonogramObject.Cell)
          }
        />
      </Box>
    </Box>
  );
};
