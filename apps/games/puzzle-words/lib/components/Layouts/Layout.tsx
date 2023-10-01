import { FC, ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import { border } from '../../layouts';
import { StaticImageData } from 'next/image';
import { base } from '../../backgrounds/base';

export const Layout: FC<{
  children: ReactNode;
  background: StaticImageData;
}> = ({ children, background }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...base(background),
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
          border: border(theme),
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
