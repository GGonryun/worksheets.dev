import { Menu, MenuProps, useTheme } from '@mui/material';
import { FC } from 'react';

export const TinyMenu: FC<
  Pick<MenuProps, 'open' | 'anchorEl' | 'onClose' | 'children'> & {
    horizontal?: 'left' | 'right' | 'center';
    showArrow?: boolean;
    minWidth?: number;
  }
> = ({ showArrow, horizontal = 'left', minWidth, ...props }) => {
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  return (
    <Menu
      disableScrollLock
      {...props}
      id="account-menu"
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.32))',
          border: border,
          mt: 0.5,
          minWidth: minWidth ?? 100,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          ...(showArrow && {
            '&:before': {
              content: '""',
              position: 'absolute',
              borderLeft: border,
              borderTop: border,
              top: -1,
              left:
                horizontal === 'left'
                  ? 14
                  : horizontal === 'center'
                  ? 'calc(50% - 5px)'
                  : 'unset',
              right:
                horizontal === 'right'
                  ? 14
                  : horizontal === 'center'
                  ? 'calc(50% - 5px)'
                  : 'unset',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          }),
        },
      }}
      transformOrigin={{ horizontal, vertical: 'top' }}
      anchorOrigin={{ horizontal, vertical: 'bottom' }}
    />
  );
};
