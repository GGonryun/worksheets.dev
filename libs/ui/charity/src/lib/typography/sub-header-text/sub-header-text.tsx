import { TypographyProps, Typography, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const SubHeaderText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant={'h4'} {...props} />
)(({ theme }) => ({
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 900,
  '@media(min-width: 600px)': {
    fontSize: '1.75rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '1.5rem',
  },
}));
