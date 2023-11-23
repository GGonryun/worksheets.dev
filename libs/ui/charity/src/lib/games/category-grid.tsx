import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { CategoryPill, CategoryPillProps } from './category-pill';

export type CategoryGridProps = {
  categories: CategoryPillProps[];
};

export const CategoryGrid: FC<CategoryGridProps> = ({ categories }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const itemSize = () => {
    if (matches) return '94px';
    return '80px';
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(auto-fit, ${itemSize()})`}
      gridTemplateRows={`repeat(auto-fit, ${itemSize()})`}
      gridAutoFlow={'dense'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={2}
    >
      {categories.map((category) => (
        <Box
          key={category.id}
          height={80}
          gridRow={'span 1'}
          gridColumn={'span 3'}
        >
          <CategoryPill {...category} />
        </Box>
      ))}
    </Box>
  );
};
