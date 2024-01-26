import { useLocalStorage } from '@worksheets/ui-core';

export const useReferralCode = () => {
  const data = useLocalStorage('referral-code', '');
  return data;
};
