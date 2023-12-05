import type { Meta } from '@storybook/react';
import { MixedGrid } from './mixed-grid';
import { Box, lighten } from '@mui/material';

const Story: Meta<typeof MixedGrid> = {
  component: MixedGrid,
  title: 'Games/MixedGrid',
  decorators: [
    (Story) => (
      <Box
        sx={{
          padding: '1rem',
          backgroundColor: (theme) => lighten(theme.palette.error.light, 0.7),
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
export default Story;

export const Empty = {
  args: {
    items: [],
  },
};

export const GamesOnly = {
  args: {
    items: [
      {
        type: 'game',
        id: '1',
        name: 'Game Name 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        type: 'game',
        id: '1',
        name: 'Game Name 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ],
  },
};

export const MixedSizeGames = {
  args: {
    items: [
      ...Array.from({ length: 100 }).map((_, i) => ({
        type: 'game',
        id: i,
        name: 'Game ' + i,
        imageUrl: 'https://via.placeholder.com/150',
        span: i % 7 === 0 ? 2 : i % 17 === 0 ? 3 : undefined,
      })),
    ],
  },
};

export const Interwoven = {
  args: {
    items: [
      {
        type: 'game',
        id: '1',
        name: 'Game Name 1',
      },
      {
        type: 'image',
        href: 'https://sidecade.com/',
        src: '/partners/sidecade/logo_500.png',
        alt: 'sidecade logo',
        subtitle: 'Play games anywhere on the web',
      },
      {
        type: 'category',
        id: '1',
        name: 'Category Name 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        type: 'progress',
        required: 100,
        current: 30,
      },
      {
        type: 'game',
        id: '2',
        name: 'Game Name 2',
        span: 2,
      },
      {
        type: 'game',
        id: '3',
        name: 'Game Name 3',
      },
      {
        type: 'game',
        id: '4',
        name: 'Game Name 4',
        span: 3,
      },
      {
        type: 'game',
        id: '5',
        name: 'Game Name 5',
      },
      {
        type: 'category',
        id: '3',
        name: 'Category Name 3',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        type: 'game',
        id: '6',
        name: 'Game Name 6',
      },
      {
        type: 'game',
        id: '7',
        name: 'Game Name 7',
      },
    ],
  },
};

export const Independent = {
  args: {
    items: [
      ...Array.from({ length: 20 }).map((_, i) => ({
        type: 'game',
        id: i,
        name: 'Game ' + i,
        imageUrl: 'https://via.placeholder.com/150',
        span: i % 7 === 0 ? 2 : i % 17 === 0 ? 3 : undefined,
      })),
      {
        type: 'category',
        id: '1',
        name: 'Category Name 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        type: 'category',
        id: '2',
        name: 'Category Name 2',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        type: 'category',
        id: '3',
        name: 'Category Name 3',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ],
  },
};

export const WithTextItem = {
  args: {
    items: [
      { type: 'text', text: 'Sports Games' },
      ...Array.from({ length: 20 }).map((_, i) => ({
        type: 'game',
        id: i,
        name: 'Game ' + i,
        imageUrl: 'https://via.placeholder.com/150',
        span: 1,
      })),
    ],
  },
};

export const WithProgress = {
  args: {
    items: [
      { type: 'progress', required: 100, current: 30 },
      ...Array.from({ length: 20 }).map((_, i) => ({
        type: 'game',
        id: i,
        name: 'Game ' + i,
        imageUrl: 'https://via.placeholder.com/150',
        span: 1,
      })),
    ],
  },
};
