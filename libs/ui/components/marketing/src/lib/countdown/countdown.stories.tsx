import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { daysFromNow } from '@worksheets/util/time';

import { Countdown } from './countdown.component';

type Story = Meta<typeof Countdown>;

export default {
  component: Countdown,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper p={{ xs: 2, sm: 4 }}>
        <Story />
      </StoryWallpaper>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {
    expiresAt: daysFromNow(7).getTime(),
  },
};
