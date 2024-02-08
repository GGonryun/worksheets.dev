import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { mockRaffles } from '@worksheets/ui/components/raffles';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { arrayFromNumber } from '@worksheets/util/arrays';

import { RaffleScreen } from './raffle-screen';

const activeRaffles = arrayFromNumber(10).flatMap((i) =>
  mockRaffles.map((mp) => ({ ...mp, id: `${Math.random()}${i}` }))
);

type Story = Meta<typeof RaffleScreen>;
const Default: Story = {
  component: RaffleScreen,
  args: {
    activeRaffles,
    suggestedRaffles: mockRaffles,
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
    suggestedRaffles: [],
    raffle: mockRaffles[4],
    connected: true,
    yourEntries: 0,
  },
};

export const Filled: Story = {
  args: {
    raffle: mockRaffles[5],
    yourEntries: 10,
    connected: true,
  },
};

export const NotLoggedIn: Story = {
  args: {
    raffle: mockRaffles[5],
    yourEntries: 0,
    connected: false,
  },
};

export const YouWon: Story = {
  args: {
    raffle: mockRaffles[3],
    yourEntries: 1,
    connected: true,
    youWon: true,
  },
};

export const Expired: Story = {
  args: {
    raffle: { ...mockRaffles[5], expiresAt: new Date('2024-01-01').getTime() },
    yourEntries: 10,
    connected: true,
    youWon: false,
  },
};
