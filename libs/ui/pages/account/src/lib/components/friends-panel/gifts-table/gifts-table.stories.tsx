import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { mockFriends } from '../../mocks';
import { GiftsTable } from './gifts-table';

type Story = Meta<typeof GiftsTable>;

const Default: Story = {
  component: GiftsTable,
  args: {
    onFavorite: action('onFavorite'),
    friends: [],
    canSendGifts: true,
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
  args: {},
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
