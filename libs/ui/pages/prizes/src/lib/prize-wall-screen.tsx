import { Container, Paper, Typography } from '@mui/material';

export const PrizeWallScreen: React.FC = () => {
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
        <Typography>Prize Wall</Typography>
      </Paper>
    </Container>
  );
};

export type PrizeWallScreenProps = React.ComponentProps<typeof PrizeWallScreen>;
