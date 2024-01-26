import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { BlogErrorScreen } from './blog-error-screen';

const Story: Meta<typeof BlogErrorScreen> = {
  component: BlogErrorScreen,
  title: 'Content/BlogErrorScreen',
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
