import { Meta } from '@storybook/react';
import { StoryWallpaper, WebsiteBackground } from '@worksheets/ui/wallpaper';

import { HomeScreen } from './home-screen';

type Story = Meta<typeof HomeScreen>;

export default {
  component: HomeScreen,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <WebsiteBackground />
        <Story />
      </StoryWallpaper>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {},
};
