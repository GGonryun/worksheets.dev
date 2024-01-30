import { BasicInformationFormContextType } from '@worksheets/util/types';
import { createContext } from 'react';

export const BasicInformationFormContext =
  createContext<BasicInformationFormContextType | null>(null);
