import { FC } from 'react';
import { CharityGamesLogo } from './charity-games-logo';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

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
      mt: -4,
      pt: 4,
      pb: 4,
    }}
  >
    <Paper
      elevation={8}
      sx={{
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 3,
      }}
    >
      <Box mb={-1}>
        <CharityGamesLogo />
      </Box>
      {children}
    </Paper>
  </Box>
);
