import { Box } from '@mui/material';

export const InternallyCenter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        p: 2,
        textAlign: 'center',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};
