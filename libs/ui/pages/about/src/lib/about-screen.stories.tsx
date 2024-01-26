import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { AboutScreen } from './about-screen';

const Story: Meta<typeof AboutScreen> = {
  component: AboutScreen,
  title: 'Content/AboutScreen',
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
