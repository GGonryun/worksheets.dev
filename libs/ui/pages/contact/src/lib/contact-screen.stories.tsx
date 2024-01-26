import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { ContactScreen } from './contact-screen';

const Story: Meta<typeof ContactScreen> = {
  component: ContactScreen,
  title: 'Content/ContactScreen',
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
