import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { mockRaffles } from '@worksheets/ui/components/raffles';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { RaffleDescription } from './raffle-description';

type Story = Meta<typeof RaffleDescription>;
const Default: Story = {
  component: RaffleDescription,
  args: {
    onShare: action('onShare'),
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Primary: Story = {
  args: {
    raffle: mockRaffles[0],
  },
};
