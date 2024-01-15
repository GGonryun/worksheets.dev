import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { mockFriends } from '../../__mocks__';
import { FriendsTable } from './friends-table';

type Story = Meta<typeof FriendsTable>;

const Default: Story = {
  component: FriendsTable,
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
    canSendGifts: true,
  },
};

export const WithPeople: Story = {
  args: {
    friends: mockFriends,
    canSendGifts: true,
  },
};

export const SentGifts: Story = {
  args: {
    friends: mockFriends,
    canSendGifts: false,
  },
};
