import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { MAX_TOKENS_PER_DAY } from '../const';
import { TokensPanel } from './tokens-panel';

type Story = Meta<typeof TokensPanel>;

const Default: Story = {
  component: TokensPanel,
  args: {
    onClaimDailyGift: action('onClaimDailyGift'),
    onClaimGiftBox: action('onClaimGiftBox'),
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
    tokens: 0,
    // 5 minutes from now, in milliseconds
    refreshTimestamp: Date.now() + 1000 * 60 * 300,
    gameProgressTokens: 0,
    giftBoxes: 0,
    dailyGiftMomentum: 1,
    referralProgress: {
      referrals: 0,
      tokens: 0,
      link: 'https://www.charity.games/referral/137647813',
    },
    claimedDailyGift: false,
  },
};

export const Primary: Story = {
  args: {
    tokens: 100,
    // 5 minutes from now, in milliseconds
    refreshTimestamp: Date.now() + 1000 * 60 * 5,
    gameProgressTokens: MAX_TOKENS_PER_DAY - 23,
    giftBoxes: 3,
    dailyGiftMomentum: 2.5,
    referralProgress: {
      referrals: 30,
      tokens: 513,
      link: 'https://charity.games/referral/137647813',
    },
    claimedDailyGift: false,
  },
};
