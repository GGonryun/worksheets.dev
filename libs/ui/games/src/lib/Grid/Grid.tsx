import { Box } from '@mui/material';
import { FC, Fragment, ReactNode } from 'react';
import { arrayFromLength } from '@worksheets/util/arrays';
import { indexToColumn, indexToRow } from '../util';

export const Grid: FC<{
  columns: number;
  rows: number;
  gap?: number;
  square: (column: number, row: number, index: number) => ReactNode;
}> = ({ columns, rows, square }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'grid',
        height: '100%',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {arrayFromLength(columns * rows).map((_, index) => (
        <Fragment key={index}>
          {square(
            indexToColumn(index, columns),
            indexToRow(index, columns),
            index
          )}
        </Fragment>
      ))}
    </Box>
  );
};
