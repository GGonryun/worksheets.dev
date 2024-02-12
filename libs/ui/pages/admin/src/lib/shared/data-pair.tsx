import { Box, Link, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const DataPair: React.FC<{
  label: string;
  value?: ReactNode;
  href?: string;
}> = ({ label, value, href }) => {
  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) =>
    href ? (
      <Link variant="body1" href={href} color="text.arcade">
        {children}
      </Link>
    ) : (
      <Typography color="text.arcade">{children}</Typography>
    );

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: '1fr 1fr',
        sm: '1fr 2fr',
        md: '1fr 3fr',
      }}
    >
      <Typography fontWeight={700}>{label}</Typography>
      <Wrapper>{value ?? ''}</Wrapper>
    </Box>
  );
};
