'use client';

import { Box, Container, Paper, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import { PlayWithPurposeBanner, PlayWithPurposeIcon } from './footer-art';
import { HelpCenterCategories } from './help-center-categories';
import { HelpCenterFooter } from './help-center-footer';
import { HelpCenterTitle } from './help-center-title';

export const HelpCenterScreen: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          //background opacity
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: (theme) => theme.shape.borderRadius,
          p: 4,
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <Box my={{ xs: 1, sm: 2 }} />
        <HelpCenterTitle />
        <Box my={{ xs: 3, sm: 5 }} />
        <HelpCenterCategories />
        <Box my={{ xs: 3, sm: 5 }} />
        {isMobile ? <PlayWithPurposeIcon /> : <PlayWithPurposeBanner />}
        <Box my={{ xs: 2, sm: 4 }} />
        <HelpCenterFooter />
        <br />
        <br />
      </Paper>
    </Container>
  );
};

export type HelpCenterScreenProps = React.ComponentProps<
  typeof HelpCenterScreen
>;
