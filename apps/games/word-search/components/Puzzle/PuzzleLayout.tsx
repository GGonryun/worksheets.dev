import { FC, ReactNode } from 'react';

import { Box } from '@mui/material';
import { borderRadius, boxShadow } from '../../util';

export const PuzzleLayout: FC<{
  grid: ReactNode;
  words: ReactNode;
}> = ({ grid, words }) => {
  return (
    <>
      <Box
        sx={{
          height: '70%',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            aspectRatio: '1 / 1',
            width: '100%',
            maxHeight: '100%',
          }}
        >
          <Box
            sx={{
              aspectRatio: '1 / 1',
              height: '100%',
              maxWidth: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              userSelect: 'none',
              touchAction: 'none',
              position: 'relative',
              backgroundColor: 'white',
              borderRadius,
              boxShadow,
            }}
          >
            {grid}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 3,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxHeight: '30%',
        }}
      >
        {words}
      </Box>
    </>
  );
};
