import { routes } from '@worksheets/routes';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useTimeout } from '@worksheets/ui-core';
import { useRouter } from 'next/router';

const ApplyReferralCode: React.FC<{
  referralCode: string;
  raffleId: string | null;
}> = ({ referralCode, raffleId }) => {
  const { replace } = useRouter();

  const [, setReferralCode] = useReferralCode();

  // wait for a bit to ensure local storage is hydrated.
  useTimeout(() => {
    setReferralCode(referralCode);
    replace(
      raffleId
        ? routes.raffle.path({
            params: {
              raffleId,
            },
          })
        : routes.play.path()
    );
  }, 100);

  return <LoadingScreen />;
};

export default ApplyReferralCode;
