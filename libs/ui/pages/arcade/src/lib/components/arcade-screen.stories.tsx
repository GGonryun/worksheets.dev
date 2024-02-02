import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { arrayFromNumber } from '@worksheets/util/arrays';
import {
  daysFromNow,
  hoursFromNow,
  minutesFromNow,
} from '@worksheets/util/time';
import { DetailedGameInfo } from '@worksheets/util/types';

import { ArcadeScreen } from './arcade-screen';
import { GAME_CATEGORIES } from './data/categories';

type Story = Meta<typeof ArcadeScreen>;

const fakeGames: DetailedGameInfo[] = [
  {
    id: '1',
    name: 'Solitaire',
    image: '/games/solitaire/icon.jpg',
    plays: 11234,
  },
  {
    id: '2',
    name: 'Word Search',
    image: '/games/word-search/icon.jpg',
    plays: 69234,
  },
  {
    id: '3',
    name: 'Puzzle Words',
    image: '/games/puzzle-words/icon.jpg',
    plays: 51234,
  },
  {
    id: '4',
    image: '/games/nonograms/icon.jpg',
    name: 'Nonograms',
    plays: 12347,
  },
  {
    id: '5',
    image: '/games/emoji-war/icon.jpg',
    name: 'Emoji War',
    plays: 87651,
  },
  {
    id: '6',
    image: '/games/word-smith/icon.jpg',
    name: 'Nonograms',
    plays: 87651,
  },
];

export default {
  component: ArcadeScreen,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {
    soonestRaffleExpiration: minutesFromNow(5).getTime(),
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
    topRaffles: [
      {
        id: '1',
        name: "Baldur's Gate 3",
        expires: daysFromNow(3).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/bg3.jpeg',
      },
      {
        id: '2',
        name: 'City Skylines II',
        expires: hoursFromNow(-1).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/csii-2.png',
      },
      {
        id: '6',
        name: 'Ragnarok Online II',
        expires: minutesFromNow(12).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/ro.jpeg',
      },
      {
        id: '3',
        name: 'Palworld',
        expires: minutesFromNow(32).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/pw.jpeg',
      },
      {
        id: '5',
        name: 'Roller Coaster Tycoon 3',
        expires: minutesFromNow(12341).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/rct3.webp',
      },
      {
        id: '4',
        name: 'EA Sports FC 24',
        expires: hoursFromNow(-1).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/fc24.jpg',
      },
    ],
    topGames: fakeGames,
    allGames: arrayFromNumber(15).flatMap((_, i) =>
      fakeGames.map((g) => ({
        ...g,
        id: `${g.id}-${i} `,
        name: `${g.name} ${i}`,
      }))
    ),
    recentGames: fakeGames,
  },
};
