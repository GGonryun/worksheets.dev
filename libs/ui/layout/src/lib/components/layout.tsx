import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { WebsiteBackground } from '@worksheets/ui/components/wallpaper';
import React from 'react';

type LayoutProps = {
  pt?: number;
  pb?: number;
  disableBackground?: boolean;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  toolbar,
  footer,
  disableBackground,
  pt,
  pb,
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
      {!disableBackground && <WebsiteBackground />}
      {toolbar}
      <Box flexGrow={1} pb={pb ?? 10} pt={pt ?? 2}>
        <MuiToolbar />
        {children}
      </Box>
      {footer}
    </Box>
  );
};
