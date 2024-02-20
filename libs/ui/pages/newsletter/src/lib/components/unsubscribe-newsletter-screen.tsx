import { Unsubscribe } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

export const UnsubscribeNewsletterScreen: React.FC<{
  unsubscribed: boolean;
  loading: boolean;
  email: string;
  onEmailUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUnsubscribe: () => void;
}> = ({ loading, unsubscribed, email, onEmailUpdate, onUnsubscribe }) => {
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
        <Typography variant="h5" component="h1" color="error.main">
          Unsubscribe from our newsletter
        </Typography>

        <Typography>
          We're sorry to see you go. If you'd like to unsubscribe from our
          newsletter, please click the 'Unsubscribe' button below.
        </Typography>
        <br />

        <TextField
          label="Email"
          type="email"
          placeholder="Enter your email address to unsubscribe from our newsletter."
          value={email}
          onChange={onEmailUpdate}
          helperText={
            unsubscribed && (
              <Typography variant="body3" color="success.main">
                You've been unsubscribed!
              </Typography>
            )
          }
        />
        <br />
        <Button
          variant="arcade"
          color="error"
          disabled={loading}
          onClick={onUnsubscribe}
          startIcon={
            loading ? (
              <CircularProgress size={20} sx={{ mr: 2 }} />
            ) : (
              <Unsubscribe />
            )
          }
        >
          {loading ? 'Unsubscribing...' : 'Unsubscribe'}
        </Button>
      </Paper>
    </Container>
  );
};
