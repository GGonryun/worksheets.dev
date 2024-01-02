import { createContext } from 'react';
import { FormContextType } from './type';

export const FormContext = createContext<FormContextType | null>(null);
