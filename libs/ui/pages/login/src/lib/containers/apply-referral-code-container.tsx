import { routes } from '@worksheets/routes';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useTimeout } from '@worksheets/ui-core';
import { useRouter } from 'next/router';

const ApplyReferralCode: React.FC<{ referralCode: string }> = ({
  referralCode,
}) => {
  const { replace } = useRouter();

  const [, setReferralCode] = useReferralCode();

  // wait for a bit to ensure local storage is hydrated.
  useTimeout(() => {
    setReferralCode(referralCode);
    replace(routes.play.path());
  }, 150);

  return <LoadingScreen />;
};

export default ApplyReferralCode;
