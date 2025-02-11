import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { playRoutes } from '@worksheets/routes';

export const InfringementText = () => (
  <Box>
    <Typography variant="body3">
      If you would like to report{' '}
      <Link href={playRoutes.terms.path()}>Copyright Infringement</Link> or a{' '}
      <Link href={playRoutes.terms.path()}>Trademark Complaint</Link>, please{' '}
      <Link href={playRoutes.contact.path()}>
        contact us directly via email
      </Link>
      .
    </Typography>
  </Box>
);
