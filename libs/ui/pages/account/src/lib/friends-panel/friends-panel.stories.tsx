import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { mockFriends } from '../__mocks__';
import { FriendsPanel } from './friends-panel';

type Story = Meta<typeof FriendsPanel>;

const Default: Story = {
  component: FriendsPanel,
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
    friends: [],
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 3,
    friendCode: 'ABC123',
    giftsRemaining: 5,
  },
};

export const WithFriends: Story = {
  args: {
    friends: mockFriends,
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 12,
    friendCode: 'ABC123',
    giftsRemaining: 5,
  },
};

export const SentGifts: Story = {
  args: {
    friends: mockFriends,
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 12,
    friendCode: 'ABC123',
    giftsRemaining: 0,
  },
};
