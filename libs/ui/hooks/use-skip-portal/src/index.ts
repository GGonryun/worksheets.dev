import { useLocalStorage } from '@worksheets/ui-core';

export const useSkipPortal = () => {
  const data = useLocalStorage('skip-portal', false);
  return data;
};
