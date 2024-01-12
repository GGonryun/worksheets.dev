import { LoginScreen } from '@worksheets/ui/pages/login';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export const LoginScreenContainer = () => {
  const { query } = useRouter();

  const redirect = (query.redirect as string) || '/';

  return (
    <LoginScreen
      onGoogleAction={() => signIn('google', { callbackUrl: redirect })}
      onDiscordAction={() => signIn('discord', { callbackUrl: redirect })}
      onGithubAction={() => signIn('github', { callbackUrl: redirect })}
    />
  );
};
