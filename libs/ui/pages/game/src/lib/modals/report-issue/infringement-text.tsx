import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const InfringementText = () => (
  <Box>
    <Typography variant="body3">
      If you would like to report{' '}
      <Link href="/terms">Copyright Infringement</Link> or a{' '}
      <Link href="/terms">Trademark Complaint</Link>, please{' '}
      <Link href="/contact">contact us directly via email</Link>.
    </Typography>
  </Box>
);
