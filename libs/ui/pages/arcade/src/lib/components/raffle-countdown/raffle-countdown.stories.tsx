import { Meta } from '@storybook/react';

import { RaffleCountdown } from './raffle-countdown';

type Story = Meta<typeof RaffleCountdown>;

export default {
  component: RaffleCountdown,
} satisfies Story;

export const FiveMinutes: Story = {
  args: {
    // 5 minutes from now
    expires: Date.now() + 5 * 60 * 1000,
  },
};

export const TwentyHours: Story = {
  args: {
    // 25 hours from now
    expires: Date.now() + 20 * 60 * 60 * 1000,
  },
};

export const ThirtyHours: Story = {
  args: {
    // 25 hours from now
    expires: Date.now() + 30 * 60 * 60 * 1000,
  },
};
