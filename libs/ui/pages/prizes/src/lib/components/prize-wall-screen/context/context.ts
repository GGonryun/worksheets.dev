import { createContext } from 'react';

import { RaffleScreenContextType } from './type';

export const RaffleScreenContext =
  createContext<RaffleScreenContextType | null>(null);
