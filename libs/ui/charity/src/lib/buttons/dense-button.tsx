import { Button, ButtonProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const DenseButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => <Button size="small" variant="contained" {...props} />
)(({ theme }) => ({
  fontWeight: 500,
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
