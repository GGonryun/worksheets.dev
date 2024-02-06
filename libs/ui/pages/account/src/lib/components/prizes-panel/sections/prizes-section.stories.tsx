import { Box, Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { hoursAgo, hoursFromNow } from '@worksheets/util/time';

import { PrizesSection } from './prizes-section';

type Story = Meta<typeof PrizesSection>;

export default {
  component: PrizesSection,
  args: {
    onClaim: action('onClaim'),
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Paper component={Box} p={{ xs: 2, sm: 4 }}>
          <Story />
        </Paper>
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Empty: Story = {
  args: {
    prizes: [],
  },
};

export const Primary: Story = {
  args: {
    prizes: Array.from({ length: 10 }, (_, i) => ({
      id: `${i}-prize`,
      name: `Prize ${i}`,
      imageUrl: 'https://via.placeholder.com/150',
      endedAt: hoursAgo(5 * i).getTime(),
      claimBy: hoursFromNow(5 * i).getTime(),
      claimedAt: i % 3 === 0 ? hoursAgo(5 * i).getTime() : undefined,
      type: 'steam-key',
    })),
  },
};
