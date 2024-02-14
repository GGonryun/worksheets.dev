import * as FullStory from '@fullstory/browser';
import { Box } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { COOKIE_DOMAIN, IS_PRODUCTION } from '@worksheets/ui/env';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const DEVELOPMENT_ORG_ID = '14WHHS';
const PRODUCTION_ORG_ID = 'o-1N7VNF-na1';

const SessionReplay = () => {
  const router = useRouter();
  const session = useSession();

  const user = trpc.user.get.useQuery(undefined, {
    enabled: session.status === 'authenticated',
  });

  useEffect(() => {
    FullStory.init({
      orgId: IS_PRODUCTION ? PRODUCTION_ORG_ID : DEVELOPMENT_ORG_ID,
      devMode: !IS_PRODUCTION,
      cookieDomain: COOKIE_DOMAIN,
    });
  }, []);

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

  useEffect(() => {
    FullStory.event('current-page', {
      path: router.asPath,
    });
  }, [router.asPath]);

  return <Box display="none" />;
};

export const DynamicSessionReplay = dynamic(
  () => Promise.resolve(SessionReplay),
  {
    ssr: false,
  }
);
