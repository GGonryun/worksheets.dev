import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { BlogScreen } from '../blog-screen/blog-screen';
import { sampleBlogMetadata } from '../data';

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
