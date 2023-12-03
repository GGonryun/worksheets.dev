import { JSXElementConstructor } from 'react';
import { LeftEdgeBlur, RightEdgeBlur } from './edge-blur';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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
