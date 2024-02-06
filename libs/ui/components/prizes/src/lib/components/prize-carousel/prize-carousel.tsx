import { Box } from '@mui/material';
import { Carousel } from '@worksheets/ui/components/carousel';
import { PrizeSchema } from '@worksheets/util/types';
import React from 'react';

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
          <Prize
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            expiresAt={item.expiresAt}
            type={item.type}
          />
        </Box>
      ))}
    </Carousel>
  );
};
