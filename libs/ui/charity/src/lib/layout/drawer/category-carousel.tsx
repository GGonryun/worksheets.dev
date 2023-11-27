import { Box, Chip, ChipProps, styled } from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { ItemCarousel } from './item-carousel';
import { useRouter } from 'next/router';

type CategoryCarouselProps = {
  categories: { id: string; name: string }[];
};

export const CategoryCarousel: FC<CategoryCarouselProps> = (props) => {
  const { push } = useRouter();

  return (
    <Box position="relative">
      <ItemCarousel>
        {props.categories.map((category) => (
          <CategoryChip
            key={category.id}
            label={category.name}
            onClick={() => push(`tags/${category.id}`)}
          />
        ))}
      </ItemCarousel>
    </Box>
  );
};

const CategoryChip = styled<JSXElementConstructor<ChipProps>>((props) => (
  <Chip color="white" {...props} />
))(({ theme }) => ({
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: theme.spacing(1, 1.5),
  boxShadow: theme.shadows[1],
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
