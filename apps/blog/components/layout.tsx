import { Favorite } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { Layout as BaseLayout } from '@worksheets/ui/layout';
import { blogRoutes, routes } from '@worksheets/ui/routes';
import { ReactNode } from 'react';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isMedium = useMediaQueryDown('lg');
  return (
    <BaseLayout
      connectionButton={
        <Button
          variant="square"
          size={isMedium ? 'small' : 'medium'}
          href={routes.home.url()}
          color={'secondary'}
        >
          <Favorite fontSize="small" />
        </Button>
      }
      links={{
        root: blogRoutes.home.url(),
        about: routes.about.url(),
        terms: routes.terms.url(),
        privacy: routes.privacy.url(),
        help: routes.help.url(),
        cookies: routes.cookies.url(),
      }}
    >
      {children}
    </BaseLayout>
  );
};
