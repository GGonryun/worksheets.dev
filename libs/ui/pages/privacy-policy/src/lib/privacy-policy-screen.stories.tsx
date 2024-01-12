import type { Meta } from '@storybook/react';

import { PrivacyPolicyScreen } from './privacy-policy-screen';

const Story: Meta<typeof PrivacyPolicyScreen> = {
  component: PrivacyPolicyScreen,
  title: 'Content/PrivacyPolicyScreen',
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
