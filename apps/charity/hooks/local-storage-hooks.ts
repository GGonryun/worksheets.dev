import { useLocalStorage } from '@worksheets/ui-core';
export const LOCAL_STORAGE_KEYS = {
  SKIP_PORTAL: 'skip-portal',
  REFERRAL_CODE: 'referral-code',
};

export const useSkipPortal = () => {
  const data = useLocalStorage(LOCAL_STORAGE_KEYS.SKIP_PORTAL, false);
  return data;
};

export const useReferralCode = () => {
  const data = useLocalStorage(LOCAL_STORAGE_KEYS.REFERRAL_CODE, '');
  return data;
};
