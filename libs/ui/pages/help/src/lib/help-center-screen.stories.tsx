import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { HelpCenterScreen } from './help-center-screen';

const Story: Meta<typeof HelpCenterScreen> = {
  component: HelpCenterScreen,
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
  args: {},
};
