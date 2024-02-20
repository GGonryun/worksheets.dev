import { LocalPostOffice } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

export const SubscribeNewsletterScreen: React.FC<{
  subscribed: boolean;
  loading: boolean;
  email: string;
  onUpdate: (email: string) => void;
  onSubscribe: () => void;
}> = ({ loading, subscribed, email, onUpdate, onSubscribe }) => {
  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 4,
          margin: { xs: 2, sm: 4 },
        }}
      >
        <Typography variant="h5" component="h1" color="primary">
          Subscribe to our newsletter
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Get the latest updates about upcoming events, raffles, games, and
          more!
        </Typography>

        <br />

        <TextField
          required
          label="Email"
          type="email"
          placeholder="Enter your email address."
          value={email}
          onChange={(event) => onUpdate(event.target.value)}
          helperText={
            subscribed && (
              <Typography variant="body3" color="success.dark">
                A confirmation email has been sent.
              </Typography>
            )
          }
        />
        <br />
        <Button
          variant="arcade"
          color="primary"
          disabled={loading}
          onClick={onSubscribe}
          startIcon={
            loading ? (
              <CircularProgress size={20} sx={{ mr: 2 }} />
            ) : (
              <LocalPostOffice />
            )
          }
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </Paper>
    </Container>
  );
};
