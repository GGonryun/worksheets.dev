import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { mockFollowers } from '../../../mocks';
import { FollowersTable } from './followers-table';

type Story = Meta<typeof FollowersTable>;

const Default: Story = {
  component: FollowersTable,
  args: {
    onAdd: action('onAdd'),
  },
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
    followers: [],
  },
};

export const WithPeople: Story = {
  args: {
    followers: mockFollowers,
  },
};
