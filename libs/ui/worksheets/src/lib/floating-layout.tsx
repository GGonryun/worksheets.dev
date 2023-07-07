import { Box, Container, Paper } from '@mui/material';
import WebsiteLayout from './website-layout';
import React from 'react';

export const FloatingLayout: React.FC<{
  children: React.ReactNode;
  secure?: boolean;
}> = ({ children, secure }) => {
  return (
    <WebsiteLayout secure={secure}>
      <Box
        width="100%"
        minHeight="100%"
        sx={(theme) => ({ backgroundColor: theme.palette.grey[200] })}
        py={2}
      >
        <Container maxWidth="lg">
          <Paper elevation={2}>{children}</Paper>
        </Container>
      </Box>
    </WebsiteLayout>
  );
};
