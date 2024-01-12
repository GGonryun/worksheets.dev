import type { Meta } from '@storybook/react';

import { BlogErrorScreen } from './blog-error-screen';

const Story: Meta<typeof BlogErrorScreen> = {
  component: BlogErrorScreen,
  title: 'Content/BlogErrorScreen',
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
  args: {},
};
