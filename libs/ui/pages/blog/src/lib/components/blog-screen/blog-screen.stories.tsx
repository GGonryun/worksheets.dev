import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { sampleBlogMetadata } from '../data';
import { BlogScreen } from './blog-screen';

const Story: Meta<typeof BlogScreen> = {
  component: BlogScreen,
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
  args: {
    posts: sampleBlogMetadata,
  },
};
