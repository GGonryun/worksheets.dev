import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

export const LoginToEarnTokensSnackbarMessage: React.FC<{ href: string }> = ({
  href,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      mt: -0.25,
    }}
  >
    <Typography variant="body1">
      Login and start earning tokens for playing games!{' '}
    </Typography>
    <Button
      variant="outlined-round"
      color="white"
      href={href}
      endIcon={<ArrowRightAlt fontSize="small" sx={{ mt: '-2px' }} />}
      sx={{
        width: 'fit-content',
      }}
    >
      Login
    </Button>
  </Box>
);
