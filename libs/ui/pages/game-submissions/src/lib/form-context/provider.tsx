import { FC, ReactNode } from 'react';
import { GameSubmissionFormContextType } from './type';
import { GameSubmissionFormContext } from './context';

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
