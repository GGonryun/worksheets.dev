import { Typography, TypographyProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const CaptionText = styled<
  JSXElementConstructor<Omit<TypographyProps, 'color'>>
>((props) => <Typography variant={'caption'} {...props} />)(({ theme }) => ({
  fontFamily: theme.typography.secondary.fontFamily,
  fontWeight: 600,
  color: theme.palette.grey[700],
  '@media(min-width: 600px)': {
    fontSize: '0.8rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.75rem',
  },
}));
