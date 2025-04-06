import { devRoutes, routes } from '@worksheets/routes';
import { Hero } from '@worksheets/ui/shadcn';
import React from 'react';

export default function Index() {
  return (
    <Hero
      image={{
        src: '/logos/charity-games.png',
        alt: 'Charity Games Logo',
      }}
      heading="Let's Make a Difference"
      description="Our free hosting service turns your games turns your games into charitable contributions. We've built an online platform that makes it easy for anyone to contribute to a cause they care about without spending any money."
      primary={{
        text: 'Get Started',
        url: routes.login.url({
          query: {
            redirect: devRoutes.dashboard.url(),
          },
        }),
      }}
      secondary={{ text: 'Learn More', url: routes.help.developers.url() }}
    />
  );
}
