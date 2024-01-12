import type { Meta } from '@storybook/react';

import { ContactScreen } from './contact-screen';

const Story: Meta<typeof ContactScreen> = {
  component: ContactScreen,
  title: 'Content/ContactScreen',
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
  args: {},
};
