import * as React from 'react';
import { Box, useTheme } from '@mui/material';
import {
  useLocalStorage,
  useNavigateToHash,
  useTitle,
  selectBackground,
} from '@worksheets/ui/common';
import { NavigationBar } from './navigation-bar';
import { NavigationDrawer } from './navigation-drawer';
import { WebsiteFooter, WebsiteFooterProps } from './footer';

export type LayoutProps = {
  children: React.ReactNode;
  secure?: boolean;
  title?: string;
  FooterProps?: WebsiteFooterProps;
};
export function WebsiteLayout({
  secure = true,
  children,
  title,
  FooterProps,
}: LayoutProps) {
  const [open, setOpen, isLoading] = useLocalStorage(
    'navigation-drawer-open',
    false
  );

  const theme = useTheme();

  const urlTitle = title ? `${title} - Worksheets` : undefined;
  useTitle(urlTitle);

  useNavigateToHash();

  if (isLoading) {
    return null;
  }

  return (
    <Box height="100%" display="flex">
      <NavigationBar open={open} secure={secure} onOpen={() => setOpen(true)} />
      <NavigationDrawer open={open} setOpen={setOpen} />
      <Box
        component="main"
        flexGrow={1}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box
          mt={'48px'} // offset for the navigation bar
          flex="1 0 auto"
          sx={{
            backgroundColor: selectBackground(theme, 'primary'),
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            backgroundColor: selectBackground(theme, 'primary'),
          }}
        >
          <WebsiteFooter {...FooterProps} />
        </Box>
      </Box>
    </Box>
  );
}
