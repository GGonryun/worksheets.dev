import { Box, Typography } from '@mui/material';
import { Layout } from './Layout';
import { Grid, Item } from '@worksheets/ui-games';
import { FC } from 'react';

export type PuzzleProps = {
  layout: boolean[][];
};

export const Puzzle: FC<PuzzleProps> = ({ layout }) => {
  return (
    <Layout
      header={<Box></Box>}
      content={
        <Grid
          rows={layout.length}
          columns={layout[0].length}
          gap={1}
          square={(c, r, i) => (
            <Item
              key={i}
              onViewportEnter={(e) => {
                // console.log("registering square")
              }}
            >
              <Typography
                fontWeight={900}
                fontSize={32}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid black',
                  flexGrow: 1,
                  display: layout[r][c] ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {layout[r][c] ? 'X' : ''}
              </Typography>
            </Item>
          )}
        />
      }
    />
  );
};
