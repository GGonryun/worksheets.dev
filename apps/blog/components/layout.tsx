import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { Layout as BaseLayout } from '@worksheets/ui/layout';
import { ReactNode } from 'react';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BaseLayout
      disableLogin
      links={{
        root: '/',
        about: `${CHARITY_GAMES_BASE_URL}/about`,
        terms: `${CHARITY_GAMES_BASE_URL}/terms`,
        privacy: `${CHARITY_GAMES_BASE_URL}/privacy`,
        help: `${CHARITY_GAMES_BASE_URL}/help`,
        cookies: `${CHARITY_GAMES_BASE_URL}/cookies`,
        login: `${CHARITY_GAMES_BASE_URL}/login`,
        account: `${CHARITY_GAMES_BASE_URL}/account`,
      }}
    >
      {children}
    </BaseLayout>
  );
};
