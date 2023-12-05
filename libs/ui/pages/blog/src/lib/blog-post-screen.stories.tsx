import type { Meta } from '@storybook/react';
import { BlogPostScreen } from './blog-post-screen';
import { sampleBlogMetadata, sampleBlogPost } from '@worksheets/ui/mocks';
import { blogAuthors } from '@worksheets/data-access/charity-games';

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
