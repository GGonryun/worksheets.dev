import { FavoriteBorder } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

export const PanelNote: React.FC<{ content: React.ReactNode }> = ({
  content,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <FavoriteBorder fontSize="small" color="secondary" />
      <Typography>{content}</Typography>
    </Box>
  );
};

export type PanelNoteProps = React.ComponentProps<typeof PanelNote>;
