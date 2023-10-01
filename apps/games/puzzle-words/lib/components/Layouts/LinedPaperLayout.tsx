import { FC, ReactNode } from 'react';
import linedpaper from '../../../public/backgrounds/lined-paper.jpg';
import { Layout } from './Layout';

export const LinedPaperLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Layout background={linedpaper}>{children}</Layout>;
};
