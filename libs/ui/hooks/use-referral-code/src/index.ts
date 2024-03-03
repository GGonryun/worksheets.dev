import { useLocalStorage } from '@worksheets/ui-core';

export const useReferralCode = () => {
  return useLocalStorage('referral-code', '');
};
