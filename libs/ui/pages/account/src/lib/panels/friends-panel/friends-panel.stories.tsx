import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockFollowers, mockFriends } from '../../mocks';
import { FriendsPanel } from './friends-panel';

type Story = Meta<typeof FriendsPanel>;

const Default: Story = {
  component: FriendsPanel,
  args: {
    onRemove: action('onRemove'),
    onFavorite: action('onFavorite'),
    onAdd: action('onAdd'),
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
    friends: [],
    followers: [],
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 3,
    friendCode: 'ABC123',
    giftsRemaining: 5,
  },
};

export const WithFriends: Story = {
  args: {
    friends: mockFriends,
    followers: [],
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 12,
    friendCode: 'ABC123',
    giftsRemaining: 5,
  },
};

export const WithFollowers: Story = {
  args: {
    friends: mockFriends,
    followers: mockFollowers,
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 12,
    friendCode: 'ABC123',
    giftsRemaining: 5,
  },
};

export const SentGifts: Story = {
  args: {
    friends: mockFriends,
    followers: mockFollowers,
    refreshTimestamp: Date.now() + 1000 * 60 * 60 * 12,
    friendCode: 'ABC123',
    giftsRemaining: 0,
  },
};
