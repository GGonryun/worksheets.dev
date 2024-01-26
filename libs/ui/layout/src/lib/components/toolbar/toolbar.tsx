import AppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';

import { LogoBox } from '../shared/logo-box';
import { ActionBox } from './action-box';
import { IconsBox } from './icons-box';

interface ToolbarProps {
  onDrawerToggle: () => void;
  connected: boolean;
  disableLogin?: boolean;
}

export const Toolbar = (props: ToolbarProps) => {
  return (
    <AppBar
      component="nav"
      elevation={0}
      sx={{
        background: (theme) => theme.palette.background['gradient-soft'],
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
    >
      <MuiToolbar
        variant="dense"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
        }}
      >
        <LogoBox />

        <ActionBox />

        <IconsBox
          connected={props.connected}
          onMenuClick={props.onDrawerToggle}
        />
      </MuiToolbar>
    </AppBar>
  );
};
