import { GitHub } from '@mui/icons-material';
import { Box, Button, Link, Paper, Typography } from '@mui/material';
import { FC } from 'react';

export type LoginScreenProps = {
  onGithubLogin: () => void;
};

export const LoginScreen: FC<LoginScreenProps> = ({ onGithubLogin }) => {
  return (
    <Box
      className="login-screen"
      sx={{
        height: '100%',
        width: '100%',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: (theme) => theme.typography.dangrek.fontFamily,
            fontSize: '2rem',
            fontWeight: 'bold',
            pb: 1,
            mt: -1,
          }}
        >
          Log In
        </Typography>
        <Typography variant="body2" textAlign="center">
          Connect to your Charity.Games account
          <br />
          <Link href={`/faq#do-i-need-an-account`}>
            <b>Do I need an account?</b>
          </Link>
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          size="small"
          startIcon={<GitHub />}
          sx={{ mt: 2, textTransform: 'none' }}
          onClick={onGithubLogin}
        >
          Login with GitHub
        </Button>
      </Paper>
    </Box>
  );
};
