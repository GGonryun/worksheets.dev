import { Box, Paper } from '@mui/material';
import { FC } from 'react';
import { CharityGamesLogo } from './charity-games-logo';

export type ConnectionContainerProps = {
  children: React.ReactNode;
};

export const ConnectionContainer: FC<ConnectionContainerProps> = ({
  children,
}) => (
  <Box
    sx={{
      height: '100%',
      width: '100%',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <Paper
      variant="outlined"
      sx={{
        border: `2px solid black`,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 3,
      }}
    >
      <CharityGamesLogo />
      {children}
    </Paper>
  </Box>
);
