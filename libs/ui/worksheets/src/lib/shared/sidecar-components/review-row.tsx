import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const ReviewRow: React.FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <Box display="flex" alignItems="center" p={0} m={0}>
      <Box width="200px">
        <Typography variant="body2" fontWeight={900}>
          {label}:
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {children}
      </Box>
    </Box>
  );
};

export const ReviewRowText: React.FC<{
  label: string;
  nonText?: boolean;
  children: ReactNode;
}> = ({ label, children, nonText }) => {
  return (
    <ReviewRow label={label}>
      {nonText ? (
        children
      ) : (
        <Typography variant="body2" color="text.secondary">
          {children}
        </Typography>
      )}
    </ReviewRow>
  );
};
