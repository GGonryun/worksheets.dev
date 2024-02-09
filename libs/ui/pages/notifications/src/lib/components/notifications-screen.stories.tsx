import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockNotifications } from '../data/notifications';
import { NotificationsScreen } from './notifications-screen';

type Story = Meta<typeof NotificationsScreen>;

export default {
  component: NotificationsScreen,
  args: {
    activeFilter: 'ALL',
    onChangeFilter: action('onChangeFilter'),
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Empty: Story = {
  args: {
    notifications: [],
  },
};
export const Primary: Story = {
  args: {
    notifications: mockNotifications,
  },
};
