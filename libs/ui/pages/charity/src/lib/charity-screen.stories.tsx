import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { sampleCharityOrganization } from '@worksheets/ui/mocks';

import { CharityScreen } from './charity-screen';

type Story = Meta<typeof CharityScreen>;

export default {
  component: CharityScreen,
  title: 'Content/CharityScreen',
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Primary: Story = {
  args: {
    charity: sampleCharityOrganization,
    pledge: { required: 100, current: 30 },
    statistics: {
      uniqueGames: 7,
      countries: [
        { name: 'United States', percent: 9 },
        { name: 'India', percent: 5 },
        { name: 'United Kingdom', percent: 3 },
        { name: 'Australia', percent: 2 },
        { name: 'Germany', percent: 2 },
        { name: 'Brazil', percent: 1 },
        { name: 'Canada', percent: 1 },
        { name: 'France', percent: 1 },
      ],
      games: [
        { id: 'puzzle-words', name: 'Puzzle Words', plays: 128 },
        { id: 'word-search', name: 'Word Search', plays: 68 },
        { id: 'emoji-war', name: 'Emoji War', plays: 31 },
        { id: 'solitaire', name: 'Solitaire', plays: 29 },
        { id: 'word-pack', name: 'Word Pack', plays: 28 },
        { id: 'word-smith', name: 'Word Smith', plays: 11 },
        { id: 'nonograms', name: 'Nonograms', plays: 6 },
      ],
      players: {
        new: 45,
        returning: 10,
      },
    },
  },
};
