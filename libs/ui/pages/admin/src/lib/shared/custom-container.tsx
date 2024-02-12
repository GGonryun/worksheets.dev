import { Container } from '@mui/material';
import { ReactNode } from 'react';

export const CustomContainer: React.FC<{
  children: ReactNode;
  fontColor?: string;
}> = ({ children, fontColor }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        color: fontColor ?? 'text.arcade',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {children}
    </Container>
  );
};
