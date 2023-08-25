import { OpenInNew } from '@mui/icons-material';
import { Typography, Link } from '@mui/material';
import { FC, ReactNode } from 'react';

export const OpenInNewLink: FC<{
  href: string;
  disabled?: boolean;
  children: ReactNode;
  variant: 'caption' | 'body2';
}> = ({ variant, href, children, disabled }) => (
  <Typography
    variant={variant}
    color={disabled ? 'text.disabled' : 'primary'}
    component="span"
  >
    <Link
      href={disabled ? undefined : href}
      target="_blank"
      color={disabled ? 'text.disabled' : 'primary'}
      sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {children}
      <OpenInNew fontSize="inherit" sx={{ ml: 0.25, mb: -0.25 }} />
    </Link>
  </Typography>
);
