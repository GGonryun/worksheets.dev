import Paper from '@mui/material/Paper';
import type { Meta } from '@storybook/react';

import { mockReferrals } from '../../../mocks';
import { ReferralsTable } from './referrals-table';

type Story = Meta<typeof ReferralsTable>;

const Default: Story = {
  component: ReferralsTable,
  args: {},
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '2rem',
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
  },
};

export const WithPeople: Story = {
  args: {
    referrals: mockReferrals,
  },
};
