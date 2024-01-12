import type { Meta } from '@storybook/react';

import { CookiePolicyScreen } from './cookie-policy-screen';

const Story: Meta<typeof CookiePolicyScreen> = {
  component: CookiePolicyScreen,
  title: 'Content/CookiePolicyScreen',
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
