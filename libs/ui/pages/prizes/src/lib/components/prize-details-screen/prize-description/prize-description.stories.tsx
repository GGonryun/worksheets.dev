import { Meta } from '@storybook/react';
import { mockPrizes } from '@worksheets/ui/components/prizes';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { PrizeDescription } from './prize-description';

type Story = Meta<typeof PrizeDescription>;
const Default: Story = {
  component: PrizeDescription,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Empty: Story = {
  args: {
    description: '',
  },
};

export const Primary: Story = {
  args: {
    description: mockPrizes[0].description,
  },
};
