import type { Meta } from '@storybook/react';

import { HelpScreen } from './help-screen';

const Story: Meta<typeof HelpScreen> = {
  component: HelpScreen,
  title: 'Content/HelpScreen',
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
