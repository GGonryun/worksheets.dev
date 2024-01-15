import { Paper } from '@mui/material';
import type { Meta } from '@storybook/react';

import { AddFriendsSection } from './add-friends-section';

type Story = Meta<typeof AddFriendsSection>;

const Default: Story = {
  component: AddFriendsSection,
  args: {
    friendCode: 'ABC123',
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

export const Primary: Story = {
  args: {},
};
