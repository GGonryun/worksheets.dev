import { Box, BoxProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';
import { LeftEdgeBlur, RightEdgeBlur } from './edge-blur';

export const ItemCarousel = styled<JSXElementConstructor<BoxProps>>((props) => (
  <Box position="relative">
    <LeftEdgeBlur />
    <Box {...props} />
    <RightEdgeBlur />
  </Box>
))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  overflow: 'auto',
  padding: theme.spacing(1),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
