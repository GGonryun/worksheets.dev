import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { FC, ReactNode } from 'react';

type AccountScreenProps = {
  settingsPanel: ReactNode;
};

export const AccountScreen: FC<AccountScreenProps> = ({ settingsPanel }) => {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
        }}
      >
        <Box display="flex" flexDirection="column" sx={{ p: { xs: 2, sm: 4 } }}>
          {settingsPanel}
        </Box>
      </Paper>
    </Container>
  );
};
