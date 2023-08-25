import { MenuItem, MenuItemProps } from '@mui/material';
import { FC } from 'react';

export const TinyMenuItem: FC<
  Pick<MenuItemProps, 'onClick' | 'selected' | 'children'>
> = (props) => <MenuItem dense {...props} />;
