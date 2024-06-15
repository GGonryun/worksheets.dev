import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';

const ApplyReferralCode: React.FC<{
  referralCode: string;
  raffleId: string | null;
}> = ({ referralCode, raffleId }) => {
  const { replace } = useRouter();

  const [, setReferralCode] = useReferralCode();
  const session = useSession();
  const referral = trpc.public.referral.get.useQuery(referralCode);
  const user = trpc.user.get.useQuery(undefined, {
    enabled: session.status === 'authenticated',
  });

  const redirect = useCallback(() => {
    replace(
      raffleId
        ? routes.raffle.path({
            params: {
              raffleId,
            },
          })
        : routes.play.path()
    );
  }, [raffleId, replace]);

  // wait for a bit to ensure local storage is hydrated.
  useEffect(() => {
    if (referral.isFetching || user.isFetching) {
      return;
    }

    if (referral.data?.id === user.data?.id) {
      console.warn('Referral code is the same as the user id, ignoring');
      redirect();
      return;
    } else {
      setReferralCode(referralCode);
      redirect();
    }
  }, [
    raffleId,
    redirect,
    referral.data?.id,
    referral.isFetching,
    referralCode,
    replace,
    setReferralCode,
    user.data?.id,
    user.isFetching,
  ]);

  return <LoadingScreen />;
};

export default ApplyReferralCode;
