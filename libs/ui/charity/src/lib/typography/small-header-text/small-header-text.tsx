import { TypographyProps, Typography, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const SmallHeaderText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant={'h6'} {...props} />
)(({ theme }) => ({
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 900,
  '@media(min-width: 600px)': {
    fontSize: '1.2rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '1.0rem',
  },
}));
