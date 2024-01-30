import { AccountCircle, Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';

import { LogoBox } from '../shared/logo-box';
import { ActionBox } from './action-box';

interface ToolbarProps {
  connected: boolean;
  loginHref: string;
  accountHref: string;
}

export const Toolbar = (props: ToolbarProps) => {
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <AppBar
      component="nav"
      elevation={0}
      sx={{
        background: (theme) => theme.palette.background['gradient-soft'],
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
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

        <Button
          href={props.connected ? props.accountHref : props.loginHref}
          variant="square"
          color="primary"
          size={isMedium ? 'small' : 'medium'}
          sx={{
            mb: 1,
          }}
        >
          {props.connected ? (
            <AccountCircle fontSize="small" />
          ) : (
            <Login fontSize="small" />
          )}
        </Button>
      </MuiToolbar>
    </AppBar>
  );
};
