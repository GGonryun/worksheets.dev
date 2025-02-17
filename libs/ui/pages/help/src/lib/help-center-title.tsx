import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { GradientTypography } from '@worksheets/ui/components/typography';

export const HelpCenterTitle: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      maxWidth: 700,
    }}
  >
    <GradientTypography
      component="h1"
      textAlign="center"
      typography={{ xs: 'h4', sm: 'h3', md: 'h2' }}
      letterSpacing={{ xs: 1, sm: 2, md: 3 }}
      background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
    >
      Help Center
    </GradientTypography>
    <Box my={0.5} />
    <Typography
      component="h2"
      typography={{ xs: 'body2', sm: 'body1' }}
      color={'text.blue.light'}
      fontWeight={{ xs: 500, sm: 500, md: 500 }}
    >
      Get answers to all your questions about the{' '}
      <Link href={routes.home.path()}>Charity Games</Link> platform.
    </Typography>
  </Box>
);
