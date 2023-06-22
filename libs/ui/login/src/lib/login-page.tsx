import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import styles from './login-page.module.css';
import { GoogleAuthProvider } from 'firebase/auth';
import { useTimeout, warn } from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '@worksheets/util/auth/client';
import { trpc } from '@worksheets/trpc/ide';

/* eslint-disable-next-line */
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  const { push } = useRouter();
  const { user, signInProvider } = useUser();
  const [loading, setLoading] = useState(true);

  const identify = trpc.user.identify.useMutation();

  useTimeout(() => {
    if (user) {
      push('/worksheets');
    } else {
      setLoading(false);
    }
  }, 2500);

  function handleLoginWithGoogle() {
    const provider = new GoogleAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');

    signInProvider(provider)
      .then((u) => identify.mutateAsync({ uid: u?.uid }))
      .then(() => push(`/worksheets`))
      .catch(warn('failed to log in with google'));
  }

  // render a loading spinner if loading.
  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <Typography variant="h4">Login Page</Typography>
      <TextField label="email" required />
      <TextField label="password" required />
      <Button variant="contained" onClick={handleLoginWithGoogle}>
        Login With Google
      </Button>
    </div>
  );
}
