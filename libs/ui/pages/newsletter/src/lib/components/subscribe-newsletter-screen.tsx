import { LocalPostOffice } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { GradientTypography } from '@worksheets/ui/components/typography';

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
        <GradientTypography
          component="h1"
          typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}
          background={(theme) =>
            theme.palette.text.marketing.gradients.blue.dark
          }
        >
          Subscribe to our newsletter
        </GradientTypography>
        <Typography
          typography={{ xs: 'body2', sm: 'body1' }}
          color="text.blue.light"
          fontWeight={{ xs: 500, sm: 500 }}
        >
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
