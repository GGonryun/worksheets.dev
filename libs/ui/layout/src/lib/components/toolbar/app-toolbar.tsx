import { Box } from '@mui/material';
import React from 'react';

import { LogoBox } from '../shared/logo-box';
import { ActionBox } from './action-box';
import { Toolbar } from './toolbar';

export interface ToolbarProps {
  connectionButton?: React.ReactNode;
  gamesButton?: React.ReactNode;
  rafflesButton?: React.ReactNode;
}

export const AppToolbar = (props: ToolbarProps) => {
  return (
    <Toolbar>
      <LogoBox />

      <ActionBox />

      <Box
        mb={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1}
      >
        {props.gamesButton}
        {props.rafflesButton}
        {props.connectionButton}
      </Box>
    </Toolbar>
  );
};
