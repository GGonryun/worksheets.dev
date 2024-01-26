import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { GameScreen } from './game-screen';
import { sampleAnalytics, sampleDeveloper, sampleGame } from './mocks';

type Story = Meta<typeof GameScreen>;

export default {
  component: GameScreen,
  args: {
    onPlay: action('onPlay'),
    onVote: action('onVote'),
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
  args: {
    suggestions: Array.from({ length: 128 }).map((_, i) => ({
      id: i.toString(),
      name: `Game Name ${i}`,
      image: 'https://picsum.photos/200',
      plays: Math.floor(Math.random() * 1000),
    })),
    game: sampleGame,
    analytics: sampleAnalytics,
    developer: sampleDeveloper,
    userVote: 'up',
  },
};
