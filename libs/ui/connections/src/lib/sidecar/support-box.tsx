import { Link, Paper, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const SupportBox: React.FC = () => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      width: 200,
      height: 180,
      display: 'flex',
      gap: 2,
      flexDirection: 'column',
      borderColor: 'primary.main',
    }}
  >
    <Typography variant="body1" fontWeight={900}>
      Need help?
    </Typography>
    <Typography variant="body2">
      <Link
        href={SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us/')}
        target="_blank"
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
      >
        Customer Support
        <OpenInNew fontSize="inherit" />
      </Link>
    </Typography>
    <Typography variant="body2">
      Contact us at{' '}
      <Link href="mailto:amodestduck@gmail.com">admin@worksheets.dev</Link> for
      more assistance
    </Typography>
  </Paper>
);
