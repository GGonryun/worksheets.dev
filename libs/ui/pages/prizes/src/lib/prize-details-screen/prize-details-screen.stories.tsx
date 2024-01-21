import { Meta } from '@storybook/react';
import { StoryWallpaper, WebsiteBackground } from '@worksheets/ui/wallpaper';

import { mockPrizes } from '../__mock__/prizes';
import { PrizeDetailsScreen } from './prize-details-screen';

type Story = Meta<typeof PrizeDetailsScreen>;
const Default: Story = {
  component: PrizeDetailsScreen,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <WebsiteBackground />
        <Story />
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Empty: Story = {
  args: {
    suggestedPrizes: [],
    prize: mockPrizes[4],
  },
};

export const Filled: Story = {
  args: {
    suggestedPrizes: mockPrizes,
    prize: mockPrizes[5],
  },
};
