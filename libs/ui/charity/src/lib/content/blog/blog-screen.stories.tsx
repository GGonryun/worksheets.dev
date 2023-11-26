import type { Meta } from '@storybook/react';
import { BlogScreen } from './blog-screen';
import { sampleBlogMetadata } from '../../_samples';

const Story: Meta<typeof BlogScreen> = {
  component: BlogScreen,
  title: 'Content/BlogScreen',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100vh',
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
    posts: sampleBlogMetadata,
  },
};
