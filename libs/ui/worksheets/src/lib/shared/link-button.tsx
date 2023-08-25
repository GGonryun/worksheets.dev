import { Typography, Link } from '@mui/material';
import { FC, ReactNode } from 'react';

export const LinkButton: FC<{
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <Typography variant="body2" fontWeight={900}>
    <Link
      color={disabled ? 'text.disabled' : 'text.primary'}
      underline={disabled ? 'none' : 'hover'}
      onClick={disabled ? () => undefined : onClick}
      sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {children}
    </Link>
  </Typography>
);
