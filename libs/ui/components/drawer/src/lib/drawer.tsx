import { Close } from '@mui/icons-material';
import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import { FC } from 'react';

export type DrawerProps = Pick<
  MuiDrawerProps,
  'children' | 'onClose' | 'open'
> & { minWidth?: number };

export type WithDrawerProps<T> = Omit<DrawerProps, 'children'> & T;

export const DRAWER_MIN_WIDTH = 240;

export const Drawer: FC<DrawerProps> = ({ children, minWidth, ...props }) => {
  return (
    <MuiDrawer
      {...props}
      anchor="right"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 0,
          minWidth: minWidth ?? DRAWER_MIN_WIDTH,
          maxWidth: '90%',
        },
      }}
    >
      <List>
        <ListItem dense sx={{ justifyContent: 'flex-end' }}>
          <IconButton
            size="small"
            onClick={() => props.onClose?.({}, 'escapeKeyDown')}
          >
            <Close fontSize="small" color="black" />
          </IconButton>
        </ListItem>
        {children}
      </List>
    </MuiDrawer>
  );
};
