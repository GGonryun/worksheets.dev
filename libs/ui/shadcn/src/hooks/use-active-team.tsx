import { useLocalStorage } from '@worksheets/ui-core';

export const useActiveTeam = () => useLocalStorage<string>('active-team', '');
