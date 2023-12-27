import { NextPageWithLayout } from '@worksheets/util-next';
import { SignUpScreen } from '@worksheets/ui/pages/login';
import { LayoutContainer } from '../containers/layout-container';
import { signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo noindex={true} />
    <SignUpScreen
      onGoogleAction={() => signIn('google', { callbackUrl: '/' })}
      onDiscordAction={() => signIn('discord', { callbackUrl: '/' })}
      onGithubAction={() => signIn('github', { callbackUrl: '/' })}
      onRedditAction={() => signIn('reddit', { callbackUrl: '/' })}
    />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
