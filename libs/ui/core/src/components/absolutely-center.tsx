import { Box } from '@mui/material';

export const AbsolutelyCentered: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};
