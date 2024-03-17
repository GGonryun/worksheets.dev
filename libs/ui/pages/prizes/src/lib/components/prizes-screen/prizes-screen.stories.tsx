import { Meta } from '@storybook/react';
import { mockPrizes } from '@worksheets/ui/components/prizes';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { PrizesScreen } from './prizes-screen';

type Story = Meta<typeof PrizesScreen>;

export default {
  component: PrizesScreen,
  args: {
    allPrizes: mockPrizes,
    activePrizes: mockPrizes,
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Primary: Story = {
  args: {},
};
