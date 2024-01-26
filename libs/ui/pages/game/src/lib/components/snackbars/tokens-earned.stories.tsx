import { Alert } from '@mui/material';
import type { Meta } from '@storybook/react';

import { TokensEarnedSnackbarMessage } from './tokens-earned';

const meta: Meta<typeof TokensEarnedSnackbarMessage> = {
  component: TokensEarnedSnackbarMessage,

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

export const EmptyTokens = {
  args: {
    tokensEarned: 0,
    earnedGiftBox: false,
  },
};

export const WithGift = {
  args: {
    tokensEarned: 10,
    earnedGiftBox: true,
  },
};
export const WithoutGift = {
  args: {
    tokensEarned: 10,
    earnedGiftBox: false,
  },
};
