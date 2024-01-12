import { ReactNode } from 'react';

export type QuestionAnswer = {
  question: string;
  answer: ReactNode;
  summary?: string;
  id: string;
};
