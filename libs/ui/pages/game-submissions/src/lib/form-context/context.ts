import { createContext } from 'react';
import { GameSubmissionFormContextType } from './type';

export const GameSubmissionFormContext =
  createContext<GameSubmissionFormContextType | null>(null);
