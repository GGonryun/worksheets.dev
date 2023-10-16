import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

export const PixelCell: FC<{
  width: number;
  height: number;
  children?: ReactNode;
}> = ({ width, height, children }) => {
  return (
    <Box
      sx={{
        borderCollapse: 'collapse',
        width: `${width}px`,
        height: `${height}px`,
        border: '1px solid black',
        margin: '-1px 0 0 -1px',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      {children}
    </Box>
  );
};
