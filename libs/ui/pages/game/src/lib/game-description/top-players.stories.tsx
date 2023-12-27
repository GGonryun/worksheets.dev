import type { Meta } from '@storybook/react';
import { TopPlayers } from './top-players';
import { sampleTopPlayers } from '../mocks';

const Story: Meta<typeof TopPlayers> = {
  component: TopPlayers,
};
export default Story;

export const Primary = {
  args: {
    players: sampleTopPlayers,
  },
};
