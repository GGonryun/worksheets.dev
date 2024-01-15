import { Box, Container, Paper } from '@mui/material';
import React from 'react';

export const HelpCenterScreen: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box>This is the help center</Box>
      </Paper>
    </Container>
  );
};

export type HelpCenterScreenProps = React.ComponentProps<
  typeof HelpCenterScreen
>;
