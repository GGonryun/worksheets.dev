import { Box, BoxProps, styled } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const Carousel = styled<JSXElementConstructor<BoxProps>>((props) => (
  <CarouselWrapper className="carousel-wrapper">
    <LeftEdgeBlur />
    <Box className="carousel-box" {...props} />
    <RightEdgeBlur />
  </CarouselWrapper>
))(({ theme }) => ({
  backgroundColor: theme.palette.background['solid-blue'],
  display: 'flex',
  overflow: 'auto',
  gap: theme.spacing(2),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  padding: theme.spacing(2),
}));

const CarouselWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const RightEdgeBlur = styled(Box)({
  position: 'absolute',
  top: 0,
  right: -2,
  width: 24,
  bottom: 0,
  background:
    'linear-gradient(270deg, rgb(12, 98, 176) 0%, rgba(12, 98, 176, 0) 100%)',
  pointerEvents: 'none',
  zIndex: 1,
});

export const LeftEdgeBlur = styled(Box)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: -2,
  width: 24,
  background:
    'linear-gradient(270deg, rgba(12, 98, 176, 0) 0%, rgb(12, 98, 176) 100%)',
  pointerEvents: 'none',
  zIndex: 1,
});

export const TopEdgeBlur = styled(Box)(({ theme }) => ({
  background:
    'linear-gradient(180deg, rgba(12, 98, 176, 1) 10%, rgba(12, 98, 176, 0) 100%)',
  position: 'absolute',
  bottom: -30,
  left: 0,
  right: 0,
  height: 30,
  zIndex: 10,
}));

// export const TopEdgeBlur = styled(Box)(({ theme }) => ({
//   background:
//     'linear-gradient(180deg, rgba(250,203,202,1) 10%, rgba(250,203,202,0) 100%)',
//   position: 'absolute',
//   bottom: -30,
//   left: 0,
//   right: 0,
//   height: 30,
//   zIndex: 10,
// }));
