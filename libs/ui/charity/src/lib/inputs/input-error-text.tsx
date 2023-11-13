import { Typography, TypographyProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!ROOT_DOMAIN) throw new Error('Missing NEXT_PUBLIC_ROOT_DOMAIN env var');

export const InputErrorText = styled<
  JSXElementConstructor<Omit<TypographyProps, 'children'> & { error?: string }>
>(({ error, ...props }) => <Typography {...props}>{error}</Typography>)(
  ({ theme, error }) => ({
    fontFamily: theme.typography.secondary.fontFamily,
    fontWeight: 400,
    fontSize: '0.75rem',
    color: theme.palette.error.main,
    padding: theme.spacing(0.5, 0, 0, 0),
    display: error ? 'block' : 'none',
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
    },
  })
);
