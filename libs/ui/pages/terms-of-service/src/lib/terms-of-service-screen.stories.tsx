import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { TermsOfServiceScreen } from './terms-of-service-screen';

const Story: Meta<typeof TermsOfServiceScreen> = {
  component: TermsOfServiceScreen,
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
