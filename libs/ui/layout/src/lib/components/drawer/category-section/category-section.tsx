import Box from '@mui/material/Box';
import { Carousel } from '@worksheets/ui/components/carousel';
import { Category } from '@worksheets/ui/components/categories';
import { BasicCategoryInfo } from '@worksheets/util/types';
import { FC } from 'react';

type CategorySectionProps = {
  categories: BasicCategoryInfo[];
};

export const CategorySection: FC<CategorySectionProps> = (props) => (
  <Box position="relative">
    <Carousel
      sx={{
        gap: 2,
      }}
    >
      {props.categories.map((category) => (
        <Category
          key={category.id}
          id={category.id}
          color="warning"
          text={category.name}
          imageSrc={category.image}
        />
      ))}
    </Carousel>
  </Box>
);
