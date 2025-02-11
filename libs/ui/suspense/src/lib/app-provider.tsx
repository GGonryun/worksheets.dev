'use client';

import { ThemeProvider } from '@emotion/react';
import { TRPCProvider } from '@worksheets/trpc-charity';
import { InitializeSessionReplay } from '@worksheets/ui/components/session-replay';
import { SnackbarContextProvider } from '@worksheets/ui/components/snackbar';
import theme from '@worksheets/ui/theme';
import { IsClientProvider } from '@worksheets/ui-core';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export const AppProvider: React.FC<{
  children: React.ReactNode;
  session: Session | null;
}> = ({ children, session }) => (
  <IsClientProvider>
    <ThemeProvider theme={theme}>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <TRPCProvider>
          <InitializeSessionReplay />
          <SnackbarContextProvider>{children}</SnackbarContextProvider>
        </TRPCProvider>
      </SessionProvider>
    </ThemeProvider>
  </IsClientProvider>
);
