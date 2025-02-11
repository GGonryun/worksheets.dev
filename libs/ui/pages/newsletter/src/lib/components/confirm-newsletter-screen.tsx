import { LocalPostOffice } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import { GradientTypography } from '@worksheets/ui/components/typography';
import { NewsletterSubscription } from '@worksheets/util/types';

export const ConfirmNewsletterScreen: React.FC<{
  loading: boolean;
  subscription: NewsletterSubscription;
  onConfirm: () => void;
}> = ({ loading, subscription, onConfirm }) => {
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
          Confirm your subscription
        </GradientTypography>
        <Typography
          typography={{ xs: 'body2', sm: 'body1' }}
          color="text.blue.light"
          fontWeight={{ xs: 500, sm: 500 }}
        >
          Click on the button below to confirm your subscription to our
          newsletter. We will never spam you or share your email address with
          anyone else.
        </Typography>

        <br />

        <Typography
          typography={{ xs: 'body2', sm: 'body1' }}
          color="secondary.main"
          fontWeight={{ xs: 500, sm: 500 }}
        >
          Email: {subscription.email}
        </Typography>

        <br />

        <Button
          variant="arcade"
          color="primary"
          disabled={loading || subscription.confirmed}
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
            : subscription.confirmed
            ? 'Confirmed!'
            : 'Subscribe'}
        </Button>
        {subscription.confirmed && (
          <Typography
            mt={1}
            component={Link}
            href={playRoutes.newsletter.subscribe.path({
              query: { id: subscription.id },
            })}
          >
            Manage your subscription
          </Typography>
        )}
      </Paper>
    </Container>
  );
};
