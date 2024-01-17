import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { TokensPanels } from '@worksheets/util/enums';

import { InviteFriendsSection } from './invite-friends-section';

type Story = Meta<typeof InviteFriendsSection>;

const Default: Story = {
  component: InviteFriendsSection,
  args: {
    id: TokensPanels.InviteFriends,
    active: TokensPanels.InviteFriends,
    onClick: action('onClick'),
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

export const Primary: Story = {
  args: {
    referrals: 30,
    tokens: 513,
    link: 'https://charity.games/referral/137647813',
  },
};
