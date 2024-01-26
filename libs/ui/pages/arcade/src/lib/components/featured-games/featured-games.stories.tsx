import { Container } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { FeaturedGames } from './featured-games';

type Story = Meta<typeof FeaturedGames>;

export default {
  component: FeaturedGames,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Container maxWidth="lg">
          <Story />
        </Container>
      </StoryWallpaper>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {
    primary: [
      {
        href: 'https://www.google.com',
        image: '/games/word-search/banner.jpg',
        name: 'Word Search',
      },
      {
        href: 'https://www.google.com',
        image: '/games/solitaire/banner.png',
        name: 'Solitaire',
      },

      {
        href: 'https://www.google.com',
        image: '/games/nonograms/banner.png',
        name: 'Nonograms',
      },
    ],
    secondary: {
      href: 'https://www.google.com',
      image: '/games/word-pack/banner.jpg',
      name: 'Word Pack',
    },
  },
};
