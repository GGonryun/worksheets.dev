import type { Meta } from '@storybook/react';
import { blogAuthors } from '@worksheets/data-access/charity-games';
import { sampleBlogMetadata, sampleBlogPost } from '@worksheets/ui/mocks';

import { BlogPostScreen } from './blog-post-screen';

const Story: Meta<typeof BlogPostScreen> = {
  component: BlogPostScreen,
  title: 'Content/BlogPostScreen',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
        }}
      >
        <Story />
      </div>
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
