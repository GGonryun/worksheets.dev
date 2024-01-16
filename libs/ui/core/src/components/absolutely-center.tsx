import { Box } from '@mui/material';

export const AbsolutelyCentered: React.FC<{
  children: React.ReactNode;
  blur?: boolean;
  pointerEvents?: 'none' | 'auto';
}> = ({ children, blur, pointerEvents = 'none' }) => {
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
        pointerEvents,
        backdropFilter: blur ? 'blur(10px)' : 'none',
      }}
    >
      {children}
    </Box>
  );
};
