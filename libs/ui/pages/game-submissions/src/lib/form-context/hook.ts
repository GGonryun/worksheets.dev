import { useContext } from 'react';
import { GameSubmissionFormContext } from './context';

export const useGameSubmissionFormContext = () => {
  const context = useContext(GameSubmissionFormContext);
  if (context === null) {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }
  return context;
};
