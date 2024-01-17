import { createContext } from 'react';

import { BasicInformationFormContextType } from './type';

export const BasicInformationFormContext =
  createContext<BasicInformationFormContextType | null>(null);
