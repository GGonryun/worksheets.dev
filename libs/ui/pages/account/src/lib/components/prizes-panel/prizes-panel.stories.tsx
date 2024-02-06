import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { hoursAgo, hoursFromNow } from '@worksheets/util/time';

import { PrizesPanel } from './prizes-panel';

type Story = Meta<typeof PrizesPanel>;

const Default: Story = {
  component: PrizesPanel,
  args: {
    onClaim: action('onClaim'),
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Paper sx={{ m: 3, p: 3 }}>
          <Story />
        </Paper>
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Empty: Story = {
  args: {
    prizes: [],
    previous: [],
  },
};

export const Primary: Story = {
  args: {
    previous: Array.from({ length: 10 }, (_, i) => ({
      id: `${i}-prize`,
      name: `Prize ${i}`,
      imageUrl: 'https://via.placeholder.com/150',
      expires: hoursFromNow(5 * i).getTime(),
      type: 'steam-key',
    })),
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
