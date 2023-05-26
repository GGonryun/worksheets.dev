import { GoogleAuthProvider } from 'firebase/auth';
import { Box, Button, Typography } from '@mui/material';
import { useUser } from './useUser';

export function LoginWithGoogle() {
  const { user, signInProvider, signOut } = useUser();

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');

    signInProvider(provider)
      .then((credentials) => {
        console.log('logged in as', credentials);
      })
      .catch((error) => {
        console.error('failed to login', error);
      });
  };

  const handleLogout = () => {
    signOut();
  };

  const handleClick = () => {
    user ? handleLogout() : handleLogin();
  };

  const buttonText = () => (user ? 'Logout' : 'Login');
  return (
    <Box>
      <Typography>Google</Typography>
      <Button variant="contained" onClick={() => handleClick()}>
        {buttonText()}
      </Button>
    </Box>
  );
}
