import { HeaderText } from '@worksheets/ui-charity';
import { FC } from 'react';

export type PostTitleProps = {
  children: string;
};

export const PostTitle: FC<PostTitleProps> = ({ children }) => {
  return <HeaderText>{children}</HeaderText>;
};
