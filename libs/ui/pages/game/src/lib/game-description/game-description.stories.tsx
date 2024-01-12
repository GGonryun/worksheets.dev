import type { Meta } from '@storybook/react';

import { sampleAnalytics, sampleDeveloper, sampleGame } from '../mocks';
import { GameDescription } from './game-description';

type StoryObj = Meta<typeof GameDescription>;

const Story: StoryObj = {
  component: GameDescription,
  title: 'Content/GameScreen/GameDescription',
};
export default Story;

export const Primary: StoryObj = {
  args: {
    game: sampleGame,
    developer: sampleDeveloper,
    analytics: sampleAnalytics,
  },
};

export const WithoutAnything: StoryObj = {
  args: {
    game: { ...sampleGame, markets: {} },
    developer: sampleDeveloper,
    analytics: { ...sampleAnalytics },
  },
};
