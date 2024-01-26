import type { Meta } from '@storybook/react';
import { blogAuthors } from '@worksheets/data-access/charity-games';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { sampleBlogMetadata, sampleBlogPost } from '@worksheets/ui/mocks';

import { BlogPostScreen } from './blog-post-screen';

const Story: Meta<typeof BlogPostScreen> = {
  component: BlogPostScreen,
  title: 'Content/BlogPostScreen',
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
