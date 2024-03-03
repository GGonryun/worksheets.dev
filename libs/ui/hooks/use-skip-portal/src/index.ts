import { useLocalStorage } from '@worksheets/ui-core';

export const useSkipPortal = () => {
  return useLocalStorage('skip-portal', false);
};
