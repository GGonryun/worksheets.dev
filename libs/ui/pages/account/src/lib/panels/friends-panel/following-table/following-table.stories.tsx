import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { mockFriends } from '../../../mocks';
import { FollowingTable } from './following-table';

type Story = Meta<typeof FollowingTable>;

const Default: Story = {
  component: FollowingTable,
  args: {
    onRemove: action('onRemove'),
    onFavorite: action('onFavorite'),
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
    friends: [],
  },
};

export const WithPeople: Story = {
  args: {
    friends: mockFriends,
  },
};
