import { FC, ReactNode } from 'react';

import { RaffleScreenContext } from './context';
import { RaffleScreenContextType } from './type';

export const RaffleScreenContextProvider: FC<{
  children: ReactNode;
  value: RaffleScreenContextType;
}> = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: RaffleScreenContextType;
}) => {
  return (
    <RaffleScreenContext.Provider value={value}>
      {children}
    </RaffleScreenContext.Provider>
  );
};
