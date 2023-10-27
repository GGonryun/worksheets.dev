import { FC } from 'react';
import { HeaderText } from '../Typography';

export type PostTitleProps = {
  children: string;
};

export const PostTitle: FC<PostTitleProps> = ({ children }) => {
  return <HeaderText>{children}</HeaderText>;
};
