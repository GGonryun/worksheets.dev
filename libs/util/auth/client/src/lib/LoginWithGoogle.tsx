import { GoogleAuthProvider } from 'firebase/auth';
import { Box, Button } from '@mui/material';
import { useUser } from './useUser';
import { useRouter } from 'next/router';

export function LoginWithGoogle() {
  const { push } = useRouter();
  const { user, signInProvider, signOut } = useUser();

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');

    signInProvider(provider)
      .then(() => push('/ide'))
      .catch((error) => {
        alert(`${error.message}`);
      });
  };

  const handleLogout = () => {
    signOut().then(() => push('/ide'));
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
