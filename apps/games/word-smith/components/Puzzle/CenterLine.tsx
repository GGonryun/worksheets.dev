import { Box } from '@mui/material';
import { boxShadow } from '@worksheets/ui-games';
import { FC } from 'react';

export const CenterLine: FC<{ height: number }> = ({ height }) => (
  <Box
    className="center-line"
    sx={{
      position: 'absolute',
      width: '100%',
      height,
      backgroundColor: (theme) => theme.palette.text.primary,
      borderRadius: '6px',
      boxShadow: boxShadow(),
    }}
  />
);
