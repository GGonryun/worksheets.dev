import { FC, ReactNode } from 'react';
import gridpaper from '../../../public/backgrounds/grid-paper.jpg';
import { Layout } from './Layout';

export const GridPaperLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Layout background={gridpaper}>{children}</Layout>;
};
