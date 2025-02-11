'use client';

import { Box, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

import { Category, CategoryProps } from './category';

export const Categories: React.FC<{
  categories: CategoryProps[];
  sx?: SystemStyleObject<Theme>;
  hideAllCategoryAction?: boolean;
}> = ({ categories, sx, hideAllCategoryAction = false }) => (
  <Box
    sx={{
      display: 'flex',
      overflow: 'scroll',
      pb: 1,
      gap: { xs: 1, sm: 1.5 },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      ...sx,
    }}
  >
    {!hideAllCategoryAction && (
      <Category
        id=""
        color="success"
        text={`All\nCategories`}
        imageSrc="/games/categories/all.png"
      />
    )}
    {categories.map((category) => (
      <Category {...category} key={category.text} />
    ))}
  </Box>
);
