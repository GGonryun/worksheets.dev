import { LocalPostOffice } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material';

export const ConfirmNewsletterScreen: React.FC<{
  confirmed: boolean;
  loading: boolean;
  email: string | undefined;
  onConfirm: () => void;
}> = ({ loading, confirmed, email, onConfirm }) => {
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
          Confirm your subscription
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Click on the button below to confirm your subscription to our
          newsletter. We will never spam you or share your email address with
          anyone else.
        </Typography>

        <br />

        <Typography variant="body1">Email: {email}</Typography>

        <br />

        <Button
          variant="arcade"
          color="primary"
          disabled={loading || !email || confirmed}
          onClick={onConfirm}
          startIcon={
            loading ? (
              <CircularProgress size={20} sx={{ mr: 2 }} />
            ) : (
              <LocalPostOffice />
            )
          }
        >
          {loading
            ? 'Subscribing...'
            : !email
            ? 'Email Required'
            : confirmed
            ? 'Confirmed!'
            : 'Subscribe'}
        </Button>
      </Paper>
    </Container>
  );
};
