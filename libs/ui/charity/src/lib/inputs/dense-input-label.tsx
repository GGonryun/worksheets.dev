import { InputLabel, InputLabelProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!ROOT_DOMAIN) throw new Error('Missing NEXT_PUBLIC_ROOT_DOMAIN env var');

export const DenseInputLabel = styled<JSXElementConstructor<InputLabelProps>>(
  InputLabel
)(({ theme }) => ({
  fontFamily: theme.typography.secondary.fontFamily,
  fontWeight: 600,
  color: theme.palette.grey[800],
  fontSize: '0.8rem',
  '@media (max-width: 600px)': {
    fontSize: '0.75rem',
  },
}));
