import { Menu, MenuProps } from '@mui/material';
import { FC } from 'react';

export const TinyMenu: FC<
  Pick<MenuProps, 'open' | 'anchorEl' | 'onClose' | 'children'>
> = (props) => {
  return (
    <Menu
      {...props}
      elevation={2}
      sx={(theme) => ({
        '& .MuiPaper-root': {
          borderRadius: 1,
          minWidth: 120,
          border: `1px solid ${theme.palette.divider}`,
          '& .MuiMenu-list': {
            p: 0,
            m: 0,
          },
        },
      })}
    />
  );
};
