import * as React from 'react';
import Box from '@mui/material/Box';
import { NavigationBar } from './navigation-bar';
import { Divider } from '@mui/material';
import { FooterSection } from './footer-section';
import { useTitle, selectBackground } from '@worksheets/ui/common';

export type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  FooterProps?: { hideLinks?: boolean };
  NavigationProps?: { hideLinks?: boolean };
};
export function MarketingLayout({
  title,
  children,
  FooterProps,
  NavigationProps,
}: LayoutProps) {
  const urlTitle = title ? `${title} - Worksheets` : undefined;
  useTitle(urlTitle);

  return (
    <Box height="100%" display="flex">
      <NavigationBar hideLinks={NavigationProps?.hideLinks} />
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
          sx={(theme) => ({
            backgroundColor: selectBackground(theme, 'primary'),
          })}
        >
          {children}
        </Box>
        <Divider />
        <FooterSection {...FooterProps} />
      </Box>
    </Box>
  );
}
