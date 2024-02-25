import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { LogoBox } from '../shared/logo-box';
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
  args: {
    children: <LogoBox />,
  },
};
