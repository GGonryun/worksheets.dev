import Box from '@mui/material/Box';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { AccountScreen } from './account-screen';
import { AccountTabsHref } from './tabs';

type Story = Meta<typeof AccountScreen>;

const Default: Story = {
  component: AccountScreen,
  args: {
    settingsPanel: <Box>Settings Panel</Box>,
    submissionsPanel: <Box>Submissions Panel</Box>,
    tokensPanel: <Box>Tokens Panel</Box>,
    referralsPanel: <Box>Referrals Panel</Box>,
    friendsPanel: <Box>Friends Panel</Box>,
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};
export default Default;

export const Settings: Story = {
  args: {
    path: AccountTabsHref.SETTINGS,
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

export const Prizes: Story = {
  args: {
    path: AccountTabsHref.PRIZES,
  },
};
