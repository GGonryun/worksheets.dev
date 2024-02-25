import AppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import React from 'react';

interface ToolbarProps {
  children: React.ReactNode;
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
        {props.children}
      </MuiToolbar>
    </AppBar>
  );
};
