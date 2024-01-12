import type { Meta } from '@storybook/react';

import { FAQScreen } from './faq-screen';

const Story: Meta<typeof FAQScreen> = {
  component: FAQScreen,
  title: 'Content/FAQScreen',
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
