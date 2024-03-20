import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { mockRaffles } from '@worksheets/ui/components/raffles';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { arrayFromNumber } from '@worksheets/util/arrays';
import {
  ParticipationSchema,
  RaffleSchema,
  WinnerSchema,
} from '@worksheets/util/types';

import { RaffleScreen } from './raffle-screen';

const activeRaffles = arrayFromNumber(10).flatMap((i) =>
  mockRaffles.map((mp) => ({ ...mp, id: i }))
);

const participants: ParticipationSchema[] = arrayFromNumber(5).map((i) => ({
  userId: `user-${i}`,
  username: `user-${i}`,
  numEntries: 100,
}));

const participation: ParticipationSchema = participants[1];

const raffle: RaffleSchema = mockRaffles[1];

const winners: WinnerSchema[] = [participation];

type Story = Meta<typeof RaffleScreen>;
const Default: Story = {
  component: RaffleScreen,
  args: {
    activeRaffles,
    participation,
    winners: [],
    participants,
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
    activeRaffles: [],
    raffle,
  },
};

export const Primary: Story = {
  args: {
    raffle,
  },
};

export const NotLoggedIn: Story = {
  args: {
    raffle,
    participation: undefined,
  },
};

export const YouWon: Story = {
  args: {
    raffle: {
      ...raffle,
      expiresAt: new Date('2024-01-01').getTime(),
    },
    winners,
  },
};

export const Expired: Story = {
  args: {
    raffle: { ...raffle, expiresAt: new Date('2024-01-01').getTime() },
  },
};
