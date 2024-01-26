import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { helpFaq } from './__data__/help-faq';
import { HelpScreen } from './help-screen';

const Story: Meta<typeof HelpScreen> = {
  component: HelpScreen,
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions about Worksheets.',
    qa: helpFaq,
  },
};
