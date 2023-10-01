import { useUser, urls, AccountMenu } from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { TextHoverButton, MarketingBarButton } from './navigation-bar';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

export const SignInButton = () => {
  const { route } = useRouter();

  const { user } = useUser();

  const loginHref = urls.app.login;
  const projectsHref = urls.app.projects;
  const onProjectsPage = route.startsWith(projectsHref);

  return user ? (
    <Flex gap={1}>
      <TextHoverButton href={urls.app.projects} active={onProjectsPage}>
        {onProjectsPage ? 'Viewing' : 'View'} projects
      </TextHoverButton>
      <AccountMenu />
    </Flex>
  ) : (
    <InactiveUserSignInButton active={route.startsWith(loginHref)} />
  );
};

export const InactiveUserSignInButton: FC<{ active?: boolean }> = ({
  active,
}) => {
  const loginHref = urls.app.login;
  return (
    <MarketingBarButton
      disableRipple
      color="primary"
      href={loginHref}
      active={active}
    >
      <b>Sign In</b>
    </MarketingBarButton>
  );
};
