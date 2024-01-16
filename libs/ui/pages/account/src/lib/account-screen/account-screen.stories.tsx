import Box from '@mui/material/Box';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { AccountScreen } from './account-screen';
import { AccountTabsHref } from './tabs';

type Story = Meta<typeof AccountScreen>;

const Default: Story = {
  component: AccountScreen,
  args: {
    onLogout: action('onLogout'),
    profilePanel: <Box>Profile Panel</Box>,
    submissionsPanel: <Box>Submissions Panel</Box>,
    tokensPanel: <Box>Tokens Panel</Box>,
    referralsPanel: <Box>Referrals Panel</Box>,
    friendsPanel: <Box>Friends Panel</Box>,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Default;

export const Profile: Story = {
  args: {
    path: AccountTabsHref.PROFILE,
  },
};

export const Submissions: Story = {
  args: {
    path: AccountTabsHref.SUBMISSIONS,
  },
};

export const Tokens: Story = {
  args: {
    path: AccountTabsHref.TOKENS,
  },
};

export const Referrals: Story = {
  args: {
    path: AccountTabsHref.REFERRALS,
  },
};

export const Friends: Story = {
  args: {
    path: AccountTabsHref.FRIENDS,
  },
};
