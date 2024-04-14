import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { minutesAgo } from '@worksheets/util/time';

import { ExpiredRafflesScreen } from './expired-raffles-screen';

type Story = Meta<typeof ExpiredRafflesScreen>;

export default {
  component: ExpiredRafflesScreen,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Empty: Story = {
  args: {
    raffles: [],
  },
};

export const Primary: Story = {
  args: {
    raffles: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Prize ${i}`,
      expiresAt: minutesAgo(i * 10).getTime(),
      type: 'STEAM_KEY',
      imageUrl: 'https://via.placeholder.com/150',
      status: i % 5 ? 'COMPLETE' : 'CANCELLED',
    })),
  },
};
