import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useTimeout } from '@worksheets/ui-core';
import { useRouter } from 'next/router';

import { useReferralCode } from '../hooks/local-storage-hooks';

const ApplyReferralCode: React.FC<{ referralCode: string }> = ({
  referralCode,
}) => {
  const { replace } = useRouter();

  const [, setReferralCode] = useReferralCode();

  // wait for a bit to ensure local storage is hydrated.
  useTimeout(() => {
    setReferralCode(referralCode);
    replace('/');
  }, 150);

  return <LoadingScreen />;
};

export default ApplyReferralCode;
