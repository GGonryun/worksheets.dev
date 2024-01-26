import { useSkipPortal } from '@worksheets/ui/hooks/use-skip-portal';
import { useRouter } from 'next/router';
import { signIn, SignInOptions } from 'next-auth/react';

import { LoginScreen } from '../login-screen';
import { createCallbackUrl } from '../util/create-callback-url';

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
