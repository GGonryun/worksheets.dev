'use client';

import { ThemeProvider } from '@emotion/react';
import { TRPCProvider } from '@worksheets/trpc-charity';
import { InitializeSessionReplay } from '@worksheets/ui/components/session-replay';
import { SnackbarContextProvider } from '@worksheets/ui/components/snackbar';
import theme from '@worksheets/ui/theme';

export const MarketingProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <TRPCProvider>
      <InitializeSessionReplay />
      <SnackbarContextProvider>{children}</SnackbarContextProvider>
    </TRPCProvider>
  </ThemeProvider>
);
