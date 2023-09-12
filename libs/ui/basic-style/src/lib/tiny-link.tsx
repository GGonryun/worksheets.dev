import { Link, LinkProps, styled } from '@mui/material';
import { FC } from 'react';

type TinyLinkProps = { size?: 'small' | 'medium' | 'large' } & Pick<
  LinkProps,
  'href' | 'children' | 'sx' | 'color'
>;

const CustomLink = styled(Link)<TinyLinkProps>(({ theme, size }) => ({
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

export const TinyLink: FC<TinyLinkProps> = ({ children, ...props }) => {
  return <CustomLink {...props}>{children}</CustomLink>;
};
