import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { PrivacyPolicyScreen } from './privacy-policy-screen';

const Story: Meta<typeof PrivacyPolicyScreen> = {
  component: PrivacyPolicyScreen,
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
