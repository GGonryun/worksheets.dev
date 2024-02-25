import { FC, ReactNode } from 'react';

import { BlogLayout } from '../components/blog-layout';

export const BlogLayoutContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <BlogLayout>{children}</BlogLayout>;
};
