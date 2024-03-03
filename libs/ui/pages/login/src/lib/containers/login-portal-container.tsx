import { trpc } from '@worksheets/trpc-charity';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { useTimeout } from '@worksheets/ui-core';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const LOADING_MESSAGE =
  "One second please... We're connecting you to our servers!";

const LoginPortalContainer = () => {
  const { query, push } = useRouter();

  const [referralCode, setReferralCode] = useReferralCode();

  // where we'll redirect the user after we've finished processing their login
  // or take them to their account page if there's no redirect
  const redirect = query.redirect
    ? (query.redirect as string)
    : routes.account.path();

  const initializeUser = trpc.user.initialize.useMutation();

  const createResources = useCallback(async () => {
    await initializeUser.mutateAsync({ referralCode });

    setReferralCode('');

    push(redirect);
  }, [initializeUser, referralCode, setReferralCode, push, redirect]);

  // wait 1 second before creating resources
  // this gives us time to load referral code from local storage
  useTimeout(createResources, 1000);

  return <LoadingScreen message={LOADING_MESSAGE} />;
};

export default LoginPortalContainer;
