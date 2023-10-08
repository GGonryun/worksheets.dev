import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

export const PuzzleLayout: FC<{
  grid: ReactNode;
  words: ReactNode;
  ratios?: {
    content: `${number}%`;
    footer: `${number}%`;
  };
}> = ({ grid, words, ratios = { content: '70%', footer: '30%' } }) => {
  return (
    <>
      <Box
        className="puzzle-layout"
        sx={{
          height: ratios.content,
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Box
          className="puzzle-layout-container"
          sx={{
            aspectRatio: '1 / 1',
            width: '100%',
            maxHeight: '100%',
          }}
        >
          <Box
            className="puzzle-layout-grid"
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
            }}
          >
            {grid}
          </Box>
        </Box>
      </Box>
      <Box
        className="puzzle-layout-footer"
        sx={{
          mt: 3,
          overflow: 'auto',
          width: '100%',
          height: ratios.footer,
        }}
      >
        {words}
      </Box>
    </>
  );
};
