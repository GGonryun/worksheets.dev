import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { JSXElementConstructor } from 'react';

export const RoundedButton = styled<
  JSXElementConstructor<ButtonProps & { target?: string }>
>(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 12,
  fontFamily: theme.typography.mPlus1p.fontFamily,
  width: '100%',
  textTransform: 'none',
  fontSize: '1rem',
  padding: theme.spacing(0.5, 4),
  marginTop: theme.spacing(1),
  boxSizing: 'border-box',
  '&.MuiButton-outlined': {
    border: `2px solid`,
  },
  '&.MuiButton-outlined:hover': {
    border: `2px solid`,
  },
  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
    fontSize: '1.15rem',
    padding: theme.spacing(0.5, 8),
    marginTop: theme.spacing(1),
  },
}));
