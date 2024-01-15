import type { Meta } from '@storybook/react';

import { HelpCenterScreen } from './help-center-screen';

const Story: Meta<typeof HelpCenterScreen> = {
  component: HelpCenterScreen,
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
