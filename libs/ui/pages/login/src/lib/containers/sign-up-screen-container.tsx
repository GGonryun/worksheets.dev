import { useSkipPortal } from '@worksheets/ui/hooks/use-skip-portal';
import { useRouter } from 'next/router';
import { signIn, SignInOptions } from 'next-auth/react';

import { SignUpScreen } from '../sign-up-screen';
import { createCallbackUrl } from '../util/create-callback-url';

const SignUpScreenContainer = () => {
  const { query } = useRouter();

  const [skipPortal] = useSkipPortal();

  const opts: SignInOptions = {
    callbackUrl: createCallbackUrl({ query, skipPortal }).toString(),
  };
  return (
    <SignUpScreen
      onGoogleAction={() => signIn('google', opts)}
      onDiscordAction={() => signIn('discord', opts)}
      onGithubAction={() => signIn('github', opts)}
      onTwitterAction={() => signIn('twitter', opts)}
    />
  );
};

export default SignUpScreenContainer;
