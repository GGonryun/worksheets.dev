import { Box, Container } from '@mui/material';

export const CustomContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container
      component={Box}
      pt={{ xs: 4, sm: 8 }}
      pb={4}
      maxWidth="lg"
      display="flex"
      alignItems="center"
      textAlign="center"
      sx={{
        color: 'text.arcade',
      }}
    >
      {children}
    </Container>
  );
};
