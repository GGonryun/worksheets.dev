'use client';

import { useSkipPortal } from '@worksheets/ui/hooks/use-skip-portal';
import { useParams } from 'next/navigation';
import { signIn, SignInOptions } from 'next-auth/react';

import { SignUpScreen } from '../sign-up-screen';
import { createCallbackUrl } from '../util/create-callback-url';

export const SignUpScreenContainer = () => {
  const query = useParams();

  const [skipPortal] = useSkipPortal();

  const opts: SignInOptions = {
    callbackUrl: createCallbackUrl({ query, skipPortal }).toString(),
  };
  return (
    <SignUpScreen
      onGoogleAction={() => signIn('google', opts)}
      onDiscordAction={() => signIn('discord', opts)}
      onGithubAction={() => signIn('github', opts)}
    />
  );
};
