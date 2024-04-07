import { Container, Paper, Typography } from '@mui/material';
import { GradientTypography } from '@worksheets/ui/components/typography';

export const SubscribeNewsletterScreen: React.FC<{
  id: string | undefined;
  form: React.ReactNode;
}> = ({ id, form }) => {
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
          {id ? 'Manage your subscription' : 'Subscribe to our newsletter'}
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
        {form}
      </Paper>
    </Container>
  );
};
