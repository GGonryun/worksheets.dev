import type { Meta } from '@storybook/react';

import { helpFaq } from './__data__/help-faq';
import { HelpScreen } from './help-screen';

const Story: Meta<typeof HelpScreen> = {
  component: HelpScreen,
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
  args: {
    qa: helpFaq,
  },
};
