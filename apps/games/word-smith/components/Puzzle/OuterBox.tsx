import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

export const OuterBox: FC<{ children?: ReactNode; size: number }> = ({
  children,
  size,
}) => {
  return (
    <Box
      sx={{
        height: size,
        width: size,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};
