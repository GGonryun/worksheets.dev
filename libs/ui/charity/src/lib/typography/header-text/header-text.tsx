import { TypographyProps, Typography, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const HeaderText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant={'h2'} {...props} />
)(({ theme }) => ({
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 900,
  '@media(min-width: 600px)': {
    fontSize: '2.5rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '2rem',
  },
}));
