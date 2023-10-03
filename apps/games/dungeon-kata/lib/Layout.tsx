import { FC, ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

export const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          border: '2px solid black',
          borderRadius: 4,
          backgroundColor: 'background.paper',
          maxWidth: 500,
          maxHeight: 800,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            p: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
