import { useContext } from 'react';

import { RaffleScreenContext } from './context';

export const useRaffleScreenContext = () => {
  const context = useContext(RaffleScreenContext);
  if (context === null) {
    throw new Error(
      'useRaffleScreenContext must be used within a RaffleScreenContext'
    );
  }
  return context;
};
