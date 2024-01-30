import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { contributionFaq } from '../data/contribution-faq';
import { ContributionScreen } from './contribution-screen';

type Story = Meta<typeof ContributionScreen>;
export default {
  component: ContributionScreen,
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
    statistics: {
      donatedGames: 10,
      uniquePlayers: 500,
      totalGamePlays: 1000,
      weeklyImpressions: 5000,
      uniqueGames: 30,
    },
    faq: contributionFaq,
  },
};
