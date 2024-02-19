import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { developersPortalFaq } from '../data';
import { DevelopersPortalScreen } from './developers-portal-screen';

type Story = Meta<typeof DevelopersPortalScreen>;
export default {
  component: DevelopersPortalScreen,
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Primary: Story = {
  args: {
    statistics: {
      uniqueGames: 30,
      uniquePlayers: 500,
      totalGamePlays: 1000,
      rafflesParticipated: 20,
      tokensAccumulated: 100,
      prizesDelivered: 10,
    },
    faq: developersPortalFaq,
  },
};
