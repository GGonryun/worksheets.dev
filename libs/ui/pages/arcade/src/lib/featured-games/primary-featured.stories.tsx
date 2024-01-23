import { Box } from '@mui/material';
import { Meta } from '@storybook/react';

import { PrimaryFeatured } from './primary-featured';

type Story = Meta<typeof PrimaryFeatured>;

export default {
  component: PrimaryFeatured,
  args: {},
  decorators: [
    (Story) => (
      <Box width={1148} height={618}>
        <Story />
      </Box>
    ),
  ],
} as Story;

export const Single: Story = {
  args: {
    items: [
      {
        href: 'https://www.google.com',
        image: '/games/word-search/banner.jpg',
        name: 'Test',
      },
    ],
  },
};

export const Many: Story = {
  args: {
    items: [
      {
        href: 'https://www.google.com',
        image: '/games/word-search/banner.jpg',
        name: 'Word Search',
      },
      {
        href: 'https://www.google.com',
        image: '/games/word-pack/banner.jpg',
        name: 'Word Pack',
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
  },
};
