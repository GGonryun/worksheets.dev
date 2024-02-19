import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { WebsiteBackground } from '@worksheets/ui/components/wallpaper';
import React from 'react';

import { LayoutLinks } from '../types';
import { WebsiteFooter } from './footer';
import { Toolbar } from './toolbar';

type LayoutProps = {
  children: React.ReactNode;
  links?: LayoutLinks;
  notificationButton?: React.ReactNode;
  connectionButton?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  connectionButton,
  links,
  notificationButton,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <WebsiteBackground />
      <Toolbar
        notificationButton={notificationButton}
        connectionButton={connectionButton}
      />
      <Box flexGrow={1} pb={10} pt={2} className={'website-content'}>
        <MuiToolbar />
        {children}
      </Box>
      <WebsiteFooter links={links} />
    </Box>
  );
};
