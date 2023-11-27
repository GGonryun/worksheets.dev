import { InputBase, InputBaseProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const DefaultInputBase = styled<JSXElementConstructor<InputBaseProps>>(
  InputBase
)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[500]}`,
    fontFamily: theme.typography.secondary.fontFamily,
    fontWeight: 500,
    padding: theme.spacing(0.5, 1),
    margin: 0,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
    '&:focus-visible': {
      outline: 0,
    },
    '@media(min-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
  },
}));
