import { Unsubscribe } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { GradientTypography } from '@worksheets/ui/components/typography';

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
        <GradientTypography
          component="h1"
          typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}
          background={(theme) =>
            theme.palette.text.marketing.gradients.blue.dark
          }
        >
          Unsubscribe from our newsletter
        </GradientTypography>

        <Typography
          typography={{ xs: 'body2', sm: 'body1' }}
          color="text.blue.light"
          fontWeight={{ xs: 500, sm: 500 }}
        >
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
