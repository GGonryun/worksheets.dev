import { useContext } from 'react';
import { FormContext } from './context';

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }
  return context;
};
