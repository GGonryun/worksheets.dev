import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { hoursFromNow } from '@worksheets/util/time';

import { mockFriends } from '../../../mocks';
import { SendGiftsSection } from './send-gifts-section';

type Story = Meta<typeof SendGiftsSection>;

const Default: Story = {
  component: SendGiftsSection,
  args: {
    refreshTimestamp: hoursFromNow(10).getTime(),
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
        <Paper sx={{ p: 1 }}>
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
    giftsRemaining: 5,
  },
};

export const Primary: Story = {
  args: {
    friends: mockFriends,
    giftsRemaining: 3,
  },
};

export const NoMoreGifts: Story = {
  args: {
    friends: mockFriends,
    giftsRemaining: 0,
  },
};
