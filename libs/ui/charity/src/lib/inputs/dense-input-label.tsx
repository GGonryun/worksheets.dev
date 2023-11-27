import { InputLabel, InputLabelProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

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
