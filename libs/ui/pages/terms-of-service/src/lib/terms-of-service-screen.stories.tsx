import type { Meta } from '@storybook/react';

import { TermsOfServiceScreen } from './terms-of-service-screen';

const Story: Meta<typeof TermsOfServiceScreen> = {
  component: TermsOfServiceScreen,
  title: 'Content/TermsOfServiceScreen',
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
