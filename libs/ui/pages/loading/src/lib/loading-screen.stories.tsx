import type { Meta } from '@storybook/react';

import { LoadingScreen } from './loading-screen';

const Story: Meta<typeof LoadingScreen> = {
  component: LoadingScreen,
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
