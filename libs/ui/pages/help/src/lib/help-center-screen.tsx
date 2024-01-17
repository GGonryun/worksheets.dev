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
          p: { xs: 1, sm: 2 },
          m: { xs: 1, sm: 4 },
        }}
      >
        <Box my={{ xs: 1, sm: 2 }} />
        <HelpCenterTitle />
        <Box my={{ xs: 4, sm: 6 }} />
        <Box width={{ xs: '95%', sm: '85%' }}>
          <HelpCenterCategories />
        </Box>
        <Box my={{ xs: 3, sm: 5 }} />
        {isMobile ? <PlayWithPurposeIcon /> : <PlayWithPurposeBanner />}
        <Box my={{ xs: 3, sm: 5 }} />
        <HelpCenterFooter />
      </Paper>
    </Container>
  );
};

export type HelpCenterScreenProps = React.ComponentProps<
  typeof HelpCenterScreen
>;
