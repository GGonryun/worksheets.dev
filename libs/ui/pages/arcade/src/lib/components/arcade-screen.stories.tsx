import { Meta } from '@storybook/react';
import { GameIconProps } from '@worksheets/ui/components/games';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { arrayFromNumber } from '@worksheets/util/arrays';
import {
  daysFromNow,
  hoursFromNow,
  minutesFromNow,
} from '@worksheets/util/time';
import { BasicGameInfo } from '@worksheets/util/types';

import { ArcadeScreen } from './arcade-screen';
import { GAME_CATEGORIES } from './data/categories';

type Story = Meta<typeof ArcadeScreen>;

const fakeGames: BasicGameInfo[] = [
  {
    id: '1',
    name: 'Solitaire',
    imageUrl: '/games/solitaire/icon.jpg',
    caption: '100+ Plays',
  },
  {
    id: '2',
    name: 'Word Search',
    imageUrl: '/games/word-search/icon.jpg',
    caption: '100+ Plays',
  },
  {
    id: '3',
    imageUrl: '/games/puzzle-words/icon.jpg',
    name: 'Puzzle Words',
    caption: '100+ Plays',
  },
  {
    id: '4',
    imageUrl: '/games/nonograms/icon.jpg',
    name: 'Nonograms',
    caption: '100+ Plays',
  },
  {
    id: '5',
    imageUrl: '/games/emoji-war/icon.jpg',
    name: 'Emoji War',
    caption: '100+ Plays',
  },
  {
    id: '6',
    imageUrl: '/games/word-smith/icon.jpg',
    name: 'Nonograms',
    caption: '100+ Plays',
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
  },
};
