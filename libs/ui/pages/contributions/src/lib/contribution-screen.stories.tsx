import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { fakeWebsiteStatistics } from '@worksheets/ui/mocks';

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
    statistics: fakeWebsiteStatistics,
    faq: contributionFaq,
  },
};
