import { trpc } from '@worksheets/trpc-charity';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { useSkipPortal } from '@worksheets/ui/hooks/use-skip-portal';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useTimeout } from '@worksheets/ui-core';
import { waitFor } from '@worksheets/util/time';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const LOADING_MESSAGE =
  "One second please... We're connecting you to our servers!";

const DynamicLoginPortal = () => {
  const { query, push } = useRouter();

  const [referralCode, setReferralCode] = useReferralCode();
  const [, setSkipPortal] = useSkipPortal();

  // where we'll redirect the user after we've finished processing their login
  // or take them to their account page if there's no redirect
  const redirect = query.redirect ? (query.redirect as string) : '/account';

  // create user resources if they don't exist.
  const setReferrer = trpc.user.referrals.set.useMutation();
  const createRewards = trpc.user.rewards.create.useMutation();
  const createReferralCode = trpc.user.referrals.codes.create.useMutation();

  const createResources = useCallback(async () => {
    await Promise.all([
      createRewards.mutateAsync(),
      createReferralCode.mutateAsync(),
      setReferrer.mutateAsync({ referralCode: referralCode }),
    ]);

    setReferralCode('');
    setSkipPortal(true);

    // wait for one more second to make sure we've created the resources
    // before redirecting the user
    await waitFor(1000);

    push(redirect);
  }, [
    createRewards,
    setReferrer,
    referralCode,
    createReferralCode,
    setSkipPortal,
    setReferralCode,
    push,
    redirect,
  ]);

  // wait .5 seconds before creating resources
  // this gives us time to load from local storage
  useTimeout(createResources, 500);

  return <LoadingScreen message={LOADING_MESSAGE} />;
};

export default DynamicLoginPortal;