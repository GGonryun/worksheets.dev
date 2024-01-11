import { SignUpScreen } from '@worksheets/ui/pages/login';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export const SignUpScreenContainer = () => {
  const { query } = useRouter();

  const redirect = (query.redirect as string) || '/';

  return (
    <SignUpScreen
      onGoogleAction={() => signIn('google', { callbackUrl: redirect })}
      onDiscordAction={() => signIn('discord', { callbackUrl: redirect })}
      onGithubAction={() => signIn('github', { callbackUrl: redirect })}
    />
  );
};
