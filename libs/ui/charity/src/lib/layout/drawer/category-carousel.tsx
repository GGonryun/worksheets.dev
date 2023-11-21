import { Box, Chip, ChipProps, styled } from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { ItemCarousel } from './item-carousel';

type CategoryCarouselProps = {
  onClick: (category: string) => void;
};

const CATEGORIES = [
  'Popular Games',
  'Car Games',
  'Shooting Games',
  'Sports Games',
  'Action Games',
  'Puzzle Games',
  'Arcade Games',
  'Strategy Games',
  'Zombie Games',
  'New Games',
  'War Games',
  'Racing Games',
  'Cooking Games',
  'Funny Games',
  'Fighting Games',
  'Adventure Games',
  '2 Player Games',
  'Stickman Games',
  'Highscore Games',
  'Multiplayer Games',
];

export const CategoryCarousel: FC<CategoryCarouselProps> = (props) => {
  return (
    <Box position="relative">
      <ItemCarousel>
        {CATEGORIES.map((category) => (
          <CategoryChip
            key={category}
            label={category}
            onClick={() => props.onClick(category)}
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
