import { GameSubmissionFormContextType } from '@worksheets/util/types';
import { FC, ReactNode } from 'react';

import { GameSubmissionFormContext } from './context';

export const GameSubmissionFormContextProvider: FC<{
  children: ReactNode;
  value: GameSubmissionFormContextType;
}> = ({ children, value }) => {
  return (
    <GameSubmissionFormContext.Provider value={value}>
      {children}
    </GameSubmissionFormContext.Provider>
  );
};
