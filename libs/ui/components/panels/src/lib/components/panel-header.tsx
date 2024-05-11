import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

export const PanelHeader: React.FC<{
  primary: string;
  secondary?: string;
  icon?: React.ReactNode;
}> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'}>{props.primary}</Typography>
      {(props.icon || props.secondary) && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          {props.icon}
          <Typography variant="h6">{props.secondary}</Typography>
        </Box>
      )}
    </Box>
  );
};

export type PanelHeaderProps = React.ComponentProps<typeof PanelHeader>;
