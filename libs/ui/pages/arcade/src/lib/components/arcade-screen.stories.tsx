import { Meta } from '@storybook/react';
import { mockGames } from '@worksheets/ui/components/games';
import { mockRaffles } from '@worksheets/ui/components/raffles';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { arrayFromNumber } from '@worksheets/util/arrays';

import { ArcadeScreen } from './arcade-screen';
import { GAME_CATEGORIES } from './data/categories';

type Story = Meta<typeof ArcadeScreen>;

export default {
  component: ArcadeScreen,
  args: {
    categories: GAME_CATEGORIES,
    featured: {
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
    topRaffles: mockRaffles,
    topGames: mockGames,
    allGames: arrayFromNumber(15).flatMap((_, i) =>
      mockGames.map((g) => ({
        ...g,
        id: `${g.id}-${i} `,
        name: `${g.name} ${i}`,
      }))
    ),
    newGames: mockGames,
    recentGames: mockGames,
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {},
};

export const WithoutRaffles: Story = {
  args: {
    topRaffles: [],
  },
};
