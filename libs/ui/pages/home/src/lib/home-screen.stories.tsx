import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { HomeScreen } from './home-screen';

type Story = Meta<typeof HomeScreen>;

export default {
  component: HomeScreen,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {},
};
