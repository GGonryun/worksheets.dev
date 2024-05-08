import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { FC } from 'react';

import { CharityGamesLogo } from './charity-games-logo';

export type ConnectionContainerProps = {
  children: React.ReactNode;
};

export const ConnectionContainer: FC<ConnectionContainerProps> = ({
  children,
}) => (
  <Container
    sx={{
      height: '100%',
      width: '100%',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <Paper
      elevation={8}
      sx={{
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        minWidth: { xs: undefined, sm: '333px' },
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
  </Container>
);
