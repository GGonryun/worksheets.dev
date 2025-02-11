import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { playRoutes } from '@worksheets/routes';
import { FC } from 'react';

export const InvalidProfileAlert: FC<{ visible: boolean | undefined }> = ({
  visible,
}) => (
  <Box my={1} display={visible ? 'block' : 'none'}>
    <Alert severity="error">
      <Typography variant="body2" fontWeight={900}>
        Incomplete Developer Profile &#8212;{' '}
        <Link href={playRoutes.account.path()} color="primary">
          Edit Account
        </Link>
      </Typography>
      <Typography variant="body3">
        Your game submission is on hold until you complete your profile.
      </Typography>
    </Alert>
  </Box>
);
