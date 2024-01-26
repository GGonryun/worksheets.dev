import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { sampleBlogMetadata } from '@worksheets/ui/mocks';

import { BlogScreen } from './blog-screen';

const Story: Meta<typeof BlogScreen> = {
  component: BlogScreen,
  title: 'Content/BlogScreen',
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
