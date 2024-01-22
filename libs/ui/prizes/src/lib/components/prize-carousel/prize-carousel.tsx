import { Box } from '@mui/material';
import { Carousel } from '@worksheets/ui/carousel';
import React from 'react';

import { PrizeSchema } from '../../types/prizes';
import { Prize } from '../prize/prize';

export const PrizeCarousel: React.FC<{
  items: PrizeSchema[];
}> = ({ items }) => {
  return (
    <Carousel>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            minHeight: { xs: 128, sm: 160, md: 192 },
            minWidth: { xs: 128, sm: 160, md: 192 },
          }}
        >
          <Prize {...item} />
        </Box>
      ))}
    </Carousel>
  );
};
