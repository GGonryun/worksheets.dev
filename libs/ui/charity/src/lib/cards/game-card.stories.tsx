import type { Meta } from '@storybook/react';
import { GameCard } from './game-card';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme';

const Story: Meta<typeof GameCard> = {
  component: GameCard,
  title: 'Cards/GameCard',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default Story;

export const Published = {
  args: {
    id: 'word-search',
    name: 'Word Search',
    team: {
      subdomain: 'localhost',
      id: '123',
    },
    image:
      'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png',
    growth: 1,
    favorites: 1,
    status: 'published',
  },
};

export const Draft = {
  args: {
    id: 'solitaire',
    name: 'Solitaire',
    team: {
      subdomain: 'official',
      id: '123',
    },
    image:
      'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png',
    growth: 0,
    favorites: 123,
    status: 'draft',
  },
};

export const Archived = {
  args: {
    id: 'word-pack',
    name: 'Word Pack',
    team: {
      subdomain: 'test',
      id: '123',
    },
    image:
      'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png',
    growth: 99,
    favorites: 123,
    status: 'archived',
  },
};

export const Restricted = {
  args: {
    id: 'puzzle-words',
    name: 'Puzzle Words',
    team: {
      subdomain: 'sample',
      id: '123',
    },
    image:
      'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png',
    growth: 12,
    favorites: 3121,
    status: 'restricted',
  },
};
