import { Box, BoxProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const SubdomainBox = styled<JSXElementConstructor<BoxProps>>((props) => (
  <Box {...props} />
))(({ theme }) => ({
  overflow: 'hidden',
  maxWidth: '100%',
  width: 'fit-content',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  ':hover': {
    backgroundColor: theme.palette.grey[300],
    textDecoration: 'underline',
    textDecorationColor: theme.palette.grey[700],
  },
}));
