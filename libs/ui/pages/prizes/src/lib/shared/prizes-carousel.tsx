import { Box, BoxProps, styled } from '@mui/material';
import React, { JSXElementConstructor } from 'react';

import { PrizeSchema } from '../../types/prizes';
import { Prize } from './prize';

export const PrizesCarousel: React.FC<{
  items: PrizeSchema[];
}> = ({ items }) => {
  return (
    <Carousel>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            minHeight: { xs: 192, sm: 224, md: 256, lg: 288, xl: 320 },
            minWidth: { xs: 192, sm: 224, md: 256, lg: 288, xl: 320 },
          }}
        >
          <Prize {...item} />
        </Box>
      ))}
    </Carousel>
  );
};

const Carousel = styled<JSXElementConstructor<BoxProps>>((props) => (
  <CarouselWrapper className="carousel-layer">
    <LeftEdgeBlur />
    <Box {...props} />
    <RightEdgeBlur />
  </CarouselWrapper>
))(({ theme }) => ({
  display: 'flex',
  overflow: 'auto',
  gap: theme.spacing(2),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  padding: theme.spacing(1, 2),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(1, 4),
  },
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(1, 6),
  },
}));

const CarouselWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RightEdgeBlur = styled(Box)({
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

const LeftEdgeBlur = styled(Box)({
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
