import { FC, ReactNode } from 'react';

import { GameSubmissionFormContext } from './context';
import { GameSubmissionFormContextType } from './type';

export const GameSubmissionFormContextProvider: FC<{
  children: ReactNode;
  value: GameSubmissionFormContextType;
}> = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: GameSubmissionFormContextType;
}) => {
  return (
    <GameSubmissionFormContext.Provider value={value}>
      {children}
    </GameSubmissionFormContext.Provider>
  );
};
