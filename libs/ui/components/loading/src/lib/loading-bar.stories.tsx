import type { Meta } from '@storybook/react';

import { LoadingBar } from './loading-bar';

const Story: Meta<typeof LoadingBar> = {
  component: LoadingBar,
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
