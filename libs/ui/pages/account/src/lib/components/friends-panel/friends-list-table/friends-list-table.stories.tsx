import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { mockFriends } from '../../mocks';
import { FriendsListTable } from './friends-list-table';

type Story = Meta<typeof FriendsListTable>;

const Default: Story = {
  component: FriendsListTable,
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

export const SentGifts: Story = {
  args: {
    friends: mockFriends,
  },
};
