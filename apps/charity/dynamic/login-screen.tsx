import { LoginScreen } from '@worksheets/ui/pages/login';
import { useRouter } from 'next/router';
import { signIn, SignInOptions } from 'next-auth/react';

import { useSkipPortal } from '../hooks/local-storage-hooks';
import { createCallbackUrl } from '../util/login-utils';

const LoginScreenContainer = () => {
  const { query } = useRouter();

  const [skipPortal] = useSkipPortal();

  const opts: SignInOptions = {
    callbackUrl: createCallbackUrl({ query, skipPortal }).toString(),
  };

  return (
    <LoginScreen
      onGoogleAction={() => signIn('google', opts)}
      onDiscordAction={() => signIn('discord', opts)}
      onGithubAction={() => signIn('github', opts)}
    />
  );
};

export default LoginScreenContainer;
