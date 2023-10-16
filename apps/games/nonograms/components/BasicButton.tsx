import { Button, ButtonProps } from '@mui/material';
import { FC, ReactNode } from 'react';
import { tabletBoxShadow } from '@worksheets/ui-games';

export const BasicButton: FC<{
  children: ReactNode;
  color?: 'white' | 'primary';
  href?: ButtonProps['href'];
  onClick?: ButtonProps['onClick'];
  endIcon?: ButtonProps['endIcon'];
  startIcon?: ButtonProps['startIcon'];
}> = ({ color = 'primary', ...props }) => {
  const paint = {
    boxShadow: tabletBoxShadow,
    color: color === 'primary' ? 'primary.contrastText' : 'primary.dark',
    backgroundColor: color === 'primary' ? 'primary.main' : 'white',
  };

  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: '50px',
        pb: 1,
        px: 3,
        ...paint,
        '&:active': {
          ...paint,
        },
        '&:focus': {
          ...paint,
        },
        '&:hover': {
          ...paint,
        },
      }}
      {...props}
    />
  );
};
