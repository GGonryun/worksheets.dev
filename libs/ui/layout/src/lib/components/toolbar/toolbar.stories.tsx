import { Login, NotificationImportant } from '@mui/icons-material';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { SquareButton } from '../shared/square-button';
import { Toolbar } from './toolbar';

type Story = Meta<typeof Toolbar>;

export default {
  component: Toolbar,
  title: 'Layout/Toolbar',
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Primary: Story = {
  args: {},
};

export const ConnectionButton: Story = {
  args: {
    connectionButton: (
      <SquareButton>
        <Login fontSize="small" />
      </SquareButton>
    ),
  },
};

export const NotificationButton: Story = {
  args: {
    notificationButton: (
      <SquareButton>
        <NotificationImportant fontSize="small" />
      </SquareButton>
    ),
  },
};

export const AllButtons: Story = {
  args: {
    connectionButton: (
      <SquareButton>
        <Login fontSize="small" />
      </SquareButton>
    ),
    notificationButton: (
      <SquareButton>
        <NotificationImportant fontSize="small" />
      </SquareButton>
    ),
  },
};
