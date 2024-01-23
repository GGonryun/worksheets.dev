import { Box } from '@mui/material';

import { Category, CategoryProps } from './category';

export const Categories: React.FC<{ categories: CategoryProps[] }> = ({
  categories,
}) => (
  <Box
    sx={{
      display: 'flex',
      overflow: 'scroll',
      pb: 1,
      gap: { xs: 1, sm: 1.5 },
      px: '24px',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }}
  >
    <Box>
      <Category
        href="/tags"
        color="success"
        text={`All\nCategories`}
        imageSrc="/games/c/game.png"
      />
    </Box>
    {categories.map((category) => (
      <Box key={category.text}>
        <Category {...category} />
      </Box>
    ))}
  </Box>
);
