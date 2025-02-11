import * as FullStory from '@fullstory/browser';
import { Box } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { COOKIE_DOMAIN, IS_PRODUCTION } from '@worksheets/ui/env';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const PRODUCTION_ORG_ID = 'o-1N7VNF-na1';

export const InitializeSessionReplay = () => {
  useEffect(() => {
    FullStory.init({
      orgId: PRODUCTION_ORG_ID,
      devMode: !IS_PRODUCTION,
      cookieDomain: COOKIE_DOMAIN,
    });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <React.Fragment />;
};

export const DynamicInitializeSessionReplay = dynamic(
  () => Promise.resolve(InitializeSessionReplay),
  {
    ssr: false,
  }
);

export const IdentifyUserSessionReplay = () => {
  const session = useSession();

  const user = trpc.user.get.useQuery(undefined, {
    enabled: session.status === 'authenticated',
  });

  useEffect(() => {
    if (user.data) {
      FullStory.identify(user.data.id, {
        userId: user.data.id,
        displayName: user.data.username,
        email: user.data.email,
        type: user.data.type,
      });
    }
  }, [user.data]);

  return <Box display="none" />;
};

export const DynamicIdentifyUserSessionReplay = dynamic(
  () => Promise.resolve(IdentifyUserSessionReplay),
  {
    ssr: false,
  }
);
