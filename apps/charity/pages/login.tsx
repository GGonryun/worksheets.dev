import { NextPageWithLayout } from '@worksheets/util-next';
import { LoginScreen } from '@worksheets/ui/pages/login';
import { LayoutContainer } from '../containers/layout-container';
import { signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const redirect = (query.redirect as string) || '/';

  return (
    <>
      <NextSeo noindex={true} />
      <LoginScreen
        onGoogleAction={() => signIn('google', { callbackUrl: redirect })}
        onDiscordAction={() => signIn('discord', { callbackUrl: redirect })}
        onGithubAction={() => signIn('github', { callbackUrl: redirect })}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
