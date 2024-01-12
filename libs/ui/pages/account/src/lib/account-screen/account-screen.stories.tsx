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
    profilePanel: <Box>Profile Panel</Box>,
    submissionsPanel: <Box>Submissions Panel</Box>,
  },
};

export const Submissions: Story = {
  args: {
    path: AccountTabsHref.SUBMISSIONS,
    profilePanel: <Box>Profile Panel</Box>,
    submissionsPanel: <Box>Submissions Panel</Box>,
  },
};
