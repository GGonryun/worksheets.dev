import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { TokensPanels } from '@worksheets/util/enums';

import { DailyRewardSection } from './daily-reward-section';

type Story = Meta<typeof DailyRewardSection>;

const Default: Story = {
  component: DailyRewardSection,
  args: {
    onClaim: action('onClaim'),
    id: TokensPanels.DailyReward,
    active: TokensPanels.DailyReward,
    onClick: action('onClick'),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '1rem',
        }}
      >
        <Paper sx={{ p: 1 }}>
          <Story />
        </Paper>
      </div>
    ),
  ],
};
export default Default;

export const Unclaimed: Story = {
  args: {
    timeRemaining: '00:01:43',
    claimed: false,
  },
};

export const Claimed: Story = {
  args: {
    timeRemaining: '00:01:43',
    claimed: true,
  },
};
