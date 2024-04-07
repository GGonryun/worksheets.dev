import { blogRoutes, routes } from '@worksheets/routes';
import React from 'react';

import { WebsiteFooter } from './footer';
import { Layout } from './layout';
import { MarketingToolbar } from './toolbar/marketing-toolbar';

type Props = {
  children: React.ReactNode;
};

export const BlogLayout: React.FC<Props> = ({ children }) => {
  const links = {
    blog: blogRoutes.home.url(),
    root: blogRoutes.home.url(),
    about: routes.about.url(),
    terms: routes.terms.url(),
    privacy: routes.privacy.url(),
    help: routes.help.url(),
    cookies: routes.cookies.url(),
  };

  return (
    <Layout
      wallpaper={'gems'}
      toolbar={<MarketingToolbar rootHref={links.root} />}
      footer={<WebsiteFooter links={links} />}
    >
      {children}
    </Layout>
  );
};
