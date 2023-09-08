import { Link, LinkProps, styled } from '@mui/material';
import { FC } from 'react';

const CustomLink = styled(Link)<TinyButtonProps>(({ theme, size }) => ({
  fontSize:
    size === 'small'
      ? theme.typography.caption.fontSize
      : size === 'medium'
      ? theme.typography.body2.fontSize
      : theme.typography.body1.fontSize,
  '&:hover': {
    //grow on hover.
    border: '1px solid',
    borderRadius: 0,
  },
}));

export type TinyButtonProps = { size?: 'small' | 'medium' | 'large' } & Pick<
  LinkProps,
  'href' | 'children' | 'sx' | 'color'
>;
export const TinyLink: FC<TinyButtonProps> = ({ children, ...props }) => {
  return <CustomLink {...props}>{children}</CustomLink>;
};
