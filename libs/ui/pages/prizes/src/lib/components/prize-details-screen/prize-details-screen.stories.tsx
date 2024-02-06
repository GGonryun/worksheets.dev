import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { mockPrizes } from '@worksheets/ui/components/prizes';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { arrayFromNumber } from '@worksheets/util/arrays';

import { PrizeDetailsScreen } from './prize-details-screen';

const allPrizes = arrayFromNumber(10).flatMap((i) =>
  mockPrizes.map((mp) => ({ ...mp, id: `${Math.random()}${i}` }))
);

type Story = Meta<typeof PrizeDetailsScreen>;
const Default: Story = {
  component: PrizeDetailsScreen,
  args: {
    allPrizes,
    suggestedPrizes: mockPrizes,
    youWon: false,
    onShare: action('onShare'),
    onRaffleClick: action('onRaffleClick'),
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

export const Empty: Story = {
  args: {
    suggestedPrizes: [],
    prize: mockPrizes[4],
    connected: true,
  },
};

export const Filled: Story = {
  args: {
    prize: mockPrizes[5],
    yourEntries: 10,
    connected: true,
  },
};

export const NotLoggedIn: Story = {
  args: {
    prize: mockPrizes[5],
    yourEntries: 0,
    connected: false,
  },
};

export const YouWon: Story = {
  args: {
    prize: mockPrizes[3],
    yourEntries: 1,
    connected: true,
    youWon: true,
  },
};

export const Expired: Story = {
  args: {
    prize: { ...mockPrizes[5], expires: new Date('2024-01-01').getTime() },
    yourEntries: 10,
  },
};
