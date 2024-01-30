import { GameSubmissionFormContextType } from '@worksheets/util/types';
import { createContext } from 'react';

export const GameSubmissionFormContext =
  createContext<GameSubmissionFormContextType | null>(null);
