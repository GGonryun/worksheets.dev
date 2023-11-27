import { Box, Button, ButtonProps, styled } from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { ItemCarousel } from './item-carousel';

type CategoryCarouselProps = {
  categories: { id: string; name: string }[];
};

export const CategoryCarousel: FC<CategoryCarouselProps> = (props) => (
  <Box position="relative">
    <ItemCarousel>
      {props.categories.map((category) => (
        <CategoryButton key={category.id} href={`/tags/${category.id}`}>
          {category.name}
        </CategoryButton>
      ))}
    </ItemCarousel>
  </Box>
);

const CategoryButton = styled<JSXElementConstructor<ButtonProps>>((props) => (
  <Button variant="contained" color="white" size="small" {...props} />
))(({ theme }) => ({
  flexShrink: 0,
  display: 'block',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: theme.spacing(0.5, 2.5),
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius * 8,
  top: 0,
  transition: theme.transitions.create(['top', 'box-shadow'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    top: -2,
    boxShadow: theme.shadows[3],
  },
  '& .MuiChip-label': {
    fontFamily: theme.typography.mPlus1p.fontFamily,
  },
}));
