import { Alert } from '@mui/material';
import type { Meta } from '@storybook/react';

import { SharedGiftSnackbarMessage } from './shared-gift-success';

type Story = Meta<typeof SharedGiftSnackbarMessage>;

const meta: Story = {
  component: SharedGiftSnackbarMessage,

  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          padding: 16,
        }}
      >
        <Alert severity="success" variant="filled">
          <Story />
        </Alert>
      </div>
    ),
  ],
};
export default meta;

export const Primary: Story = {
  args: {
    username: 'Gonryun',
  },
};
