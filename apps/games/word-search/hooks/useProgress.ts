import { useLocalStorage } from '@worksheets/ui-core';

export const useProgress = () => {
  const [level, setLevel] = useLocalStorage<number>('level', -1);

  return { level, setLevel };
};
