import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const ReviewRow: React.FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <Box display="flex" alignItems="center" p={0} m={0}>
      <Box width="190px">
        <Typography variant="body2" fontWeight={900}>
          {label}:
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {children}
        </Typography>
      </Box>
    </Box>
  );
};
