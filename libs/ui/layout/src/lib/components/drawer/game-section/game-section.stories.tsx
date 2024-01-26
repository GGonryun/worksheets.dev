import { Box } from '@mui/material';
import type { Meta } from '@storybook/react';

import { sampleGames } from '../../../data';
import { GameSection } from './game-section';
type Story = Meta<typeof GameSection>;

export default {
  component: GameSection,
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        <Story />
      </Box>
    ),
  ],
} as Story;

export const LargeIcons: Story = {
  args: {
    title: 'Popular This Week',
    href: '#',
    games: [],
  },
};

export const SmallIcons: Story = {
  args: {
    title: 'Popular This Week',
    href: '#',
    games: sampleGames,
  },
};

export const SectionWithoutLink = {
  args: {
    title: 'Popular This Week',
    games: sampleGames,
  },
};
