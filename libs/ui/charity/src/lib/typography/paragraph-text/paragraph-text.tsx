import { TypographyProps, Typography, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const ParagraphText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant={'body1'} {...props} />
)(({ theme }) => ({
  fontFamily: theme.typography.secondary.fontFamily,
  fontWeight: 400,
}));
