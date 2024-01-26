import Paper from '@mui/material/Paper';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockReferrals } from '../mocks';
import { ReferralsPanel } from './referrals-panel';

type Story = Meta<typeof ReferralsPanel>;

const Default: Story = {
  component: ReferralsPanel,
  args: {},
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
    referrals: [],
    link: 'https://www.worksheets.dev',
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 23,
    gamesPlayed: 0,
  },
};

export const WithReferrals: Story = {
  args: {
    referrals: mockReferrals,
    link: 'https://www.worksheets.dev',
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 23,
    gamesPlayed: 33,
  },
};
