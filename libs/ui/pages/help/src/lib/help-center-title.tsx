import { Box, Link, Typography } from '@mui/material';

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
    <Typography variant="h3" fontSize={{ xs: '2rem', sm: '3rem' }}>
      Help Center
    </Typography>
    <Box my={0.5} />
    <Typography fontSize={{ xs: '0.875rem', sm: '1rem' }}>
      Get answers to all your questions about the{' '}
      <Link href="/">Charity Games</Link> platform.
    </Typography>
  </Box>
);

export type HelpCenterTitleProps = React.ComponentProps<typeof HelpCenterTitle>;
