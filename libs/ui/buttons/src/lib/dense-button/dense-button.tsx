import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { JSXElementConstructor } from 'react';

export const DenseButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => <Button size="small" variant="contained" {...props} />
)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '0.85rem',
  fontFamily: theme.typography.mPlus1p.fontFamily,
  textTransform: 'none',
  padding: theme.spacing(0.5, 2),
  '&:hover': {
    boxShadow: 'none',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.75rem',
  },
}));
