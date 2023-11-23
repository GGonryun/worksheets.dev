import type { Meta } from '@storybook/react';
import { GameGrid } from './game-grid';

const Story: Meta<typeof GameGrid> = {
  component: GameGrid,
  title: 'Games/GameGrid',
};
export default Story;

export const Primary = {
  args: {
    games: Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      name: 'Game ' + i,
      size: i % 7 === 0 ? 2 : i % 17 === 0 ? 3 : undefined,
    })),
  },
};
