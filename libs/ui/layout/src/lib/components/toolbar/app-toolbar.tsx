import { Box } from '@mui/material';
import React from 'react';

import { LogoBox } from '../shared/logo-box';
import { ActionBox } from './action-box';
import { Toolbar } from './toolbar';

interface ToolbarProps {
  notificationButton?: React.ReactNode;
  connectionButton?: React.ReactNode;
  rootHref?: string;
}

export const AppToolbar = (props: ToolbarProps) => {
  return (
    <Toolbar>
      <LogoBox rootHref={props.rootHref} />

      <ActionBox />

      <Box
        mb={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1}
      >
        {props.notificationButton}
        {props.connectionButton}
      </Box>
    </Toolbar>
  );
};
