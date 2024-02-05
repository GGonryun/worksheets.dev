import { Box } from '@mui/material';
import { ReactNode } from 'react';

export const ArcadeItemGrid: React.FC<{ children: ReactNode[] }> = ({
  children,
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: `repeat(2, minmax(72px, 200px))`,
        mobile1: `repeat(2, minmax(72px, 200px))`,
        mobile2: `repeat(3, minmax(72px, 200px))`,
        sm: `repeat(3, minmax(100px, 200px))`,
        desktop1: `repeat(4, minmax(100px, 200px))`,
        md: `repeat(5, minmax(100px, 200px))`,
        lg: `repeat(6, minmax(100px, 200px))`,
        xl: `repeat(6, minmax(100px, 200px))`,
      },
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: { xs: 2, sm: 3, md: 4 },
    }}
  >
    {children}
  </Box>
);
