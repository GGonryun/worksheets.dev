import { Box } from '@mui/material';

export const PrizeListLayout: React.FC<{
  children: React.ReactNode[];
}> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 4,
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
        },
      }}
    >
      {children}
    </Box>
  );
};
