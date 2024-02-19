import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import React from 'react';

import { LogoBox } from '../shared/logo-box';
import { ActionBox } from './action-box';

interface ToolbarProps {
  connectionButton?: React.ReactNode;
  notificationButton?: React.ReactNode;
}

export const Toolbar = (props: ToolbarProps) => {
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

        <Box mb={1} display="flex" flexDirection="row" gap={1}>
          {props.notificationButton}
          {props.connectionButton}
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};
