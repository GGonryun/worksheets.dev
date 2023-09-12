import { OpenInNew } from '@mui/icons-material';
import { Typography, Link, LinkProps, TypographyProps } from '@mui/material';
import { FC } from 'react';

export const OpenInNewLink: FC<
  {
    disabled?: boolean;
  } & Pick<LinkProps, 'href' | 'variant' | 'children'> &
    Pick<TypographyProps, 'fontSize'>
> = ({ variant, href, children, disabled, fontSize }) => (
  <Typography
    variant={variant}
    color={disabled ? 'text.disabled' : 'primary'}
    component="span"
    fontSize={fontSize}
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
