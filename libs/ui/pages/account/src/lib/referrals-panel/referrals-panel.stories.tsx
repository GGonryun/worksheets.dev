import Paper from '@mui/material/Paper';
import type { Meta } from '@storybook/react';

import { mockReferrals } from '../__mocks__';
import { ReferralsPanel } from './referrals-panel';

type Story = Meta<typeof ReferralsPanel>;

const Default: Story = {
  component: ReferralsPanel,
  args: {},
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '1rem',
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Story />
        </Paper>
      </div>
    ),
  ],
};

export default Default;

export const Empty: Story = {
  args: {
    referrals: [],
    link: 'https://www.worksheets.dev',
    tokens: 0,
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 23,
    gamesPlayed: 0,
  },
};

export const WithReferrals: Story = {
  args: {
    referrals: mockReferrals,
    link: 'https://www.worksheets.dev',
    tokens: 123561,
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 23,
    gamesPlayed: 33,
  },
};
