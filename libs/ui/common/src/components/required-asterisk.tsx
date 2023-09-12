import { Box } from '@mui/material';
import { FC } from 'react';

export const RequiredAsterisk: FC<{ disabled?: boolean }> = ({ disabled }) => (
  <Box
    component="span"
    sx={(theme) => ({
      color: disabled ? theme.palette.text.disabled : theme.palette.error.light,
      pl: 0.5,
    })}
  >
    *
  </Box>
);
