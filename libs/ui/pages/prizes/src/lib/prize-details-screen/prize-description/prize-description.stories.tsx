import { Meta } from '@storybook/react';
import { StoryWallpaper, WebsiteBackground } from '@worksheets/ui/wallpaper';

import { mockPrizes } from '../../__mock__/prizes';
import { PrizeDescription } from './prize-description';

type Story = Meta<typeof PrizeDescription>;
const Default: Story = {
  component: PrizeDescription,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <WebsiteBackground />
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
