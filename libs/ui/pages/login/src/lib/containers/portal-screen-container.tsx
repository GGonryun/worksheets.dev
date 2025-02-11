'use client';

import { portalRoutes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useTimeout } from '@worksheets/ui-core';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

const LOADING_MESSAGE =
  "One second please... We're connecting you to our servers!";

export const PortalScreenContainer = () => {
  const session = useSession();
  const { push } = useRouter();
  const query = useParams();

  const [referralCode] = useReferralCode();

  // where we'll redirect the user after we've finished processing their login
  // or take them to their account page if there's no redirect
  const redirect = query.redirect
    ? (query.redirect as string)
    : portalRoutes.account.path();

  const initializeUser = trpc.user.initialize.useMutation();

  const createResources = useCallback(async () => {
    if (session.status === 'unauthenticated') {
      push(portalRoutes.login.path());
      return;
    }

    await initializeUser.mutateAsync({ referralCode });

    push(redirect);
  }, [session.status, initializeUser, referralCode, push, redirect]);

  // wait 1 second before creating resources
  // this gives us time to load referral code from local storage
  useTimeout(createResources, 1000);

  return <LoadingScreen message={LOADING_MESSAGE} />;
};
