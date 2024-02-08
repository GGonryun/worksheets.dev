import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { mockPrizes } from '@worksheets/ui/components/prizes';
import { mockRaffles } from '@worksheets/ui/components/raffles';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { PrizeScreen } from './prize-screen';

type Story = Meta<typeof PrizeScreen>;

export default {
  component: PrizeScreen,
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
} satisfies Story;

export const Primary: Story = {
  args: {
    prize: mockPrizes[0],
    activeRaffles: mockRaffles
      .filter((raffle) => raffle.expiresAt > Date.now())
      .sort((a, b) => a.expiresAt - b.expiresAt),
    expiredRaffles: mockRaffles.filter(
      (raffle) => raffle.expiresAt < Date.now()
    ),
    suggestions: mockPrizes,
  },
};

export const Empty: Story = {
  args: {
    prize: mockPrizes[0],
    activeRaffles: [],
    expiredRaffles: [],
    suggestions: mockPrizes,
  },
};
