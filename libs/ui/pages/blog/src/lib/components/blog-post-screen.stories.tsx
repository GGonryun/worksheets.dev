import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { blogAuthors } from '@worksheets/util/blog';

import { BlogPostScreen } from './blog-post-screen';
import { sampleBlogMetadata, sampleBlogPost } from './data';

const Story: Meta<typeof BlogPostScreen> = {
  component: BlogPostScreen,
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
    metadata: sampleBlogMetadata[0],
    content: sampleBlogPost,
    author: blogAuthors['miguel-campos'],
  },
};
