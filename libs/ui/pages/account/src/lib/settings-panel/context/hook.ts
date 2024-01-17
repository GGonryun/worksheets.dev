import { useContext } from 'react';

import { BasicInformationFormContext } from './context';

export const useBasicInformationFormContext = () => {
  const context = useContext(BasicInformationFormContext);
  if (context === null) {
    throw new Error(
      'useBasicInformationFormContext must be used within a BasicInformationFormContextProvider'
    );
  }
  return context;
};
