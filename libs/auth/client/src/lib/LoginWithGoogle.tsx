import { GoogleAuthProvider } from 'firebase/auth';
import { Box, Button } from '@mui/material';
import { useUser } from './useUser';

export function LoginWithGoogle() {
  const { user, signInProvider, signOut } = useUser();

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');

    signInProvider(provider).catch((error) => {
      alert(`${error.message}`);
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
      <Button variant="contained" onClick={() => handleClick()}>
        {buttonText()}
      </Button>
    </Box>
  );
}
