import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { Toolbar } from './toolbar';

const Story: Meta<typeof Toolbar> = {
  component: Toolbar,
  title: 'Layout/Toolbar',
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {},
};

export const LoggedIn = {
  args: {
    connected: true,
  },
};

export const disableLogin = {
  args: {
    disableLogin: true,
  },
};
