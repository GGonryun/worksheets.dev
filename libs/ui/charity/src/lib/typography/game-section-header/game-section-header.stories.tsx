import type { Meta } from '@storybook/react';
import { GameSectionHeader } from './game-section-header';

const Story: Meta<typeof GameSectionHeader> = {
  component: GameSectionHeader,
  title: 'Typography/GameSectionHeader',
};
export default Story;

export const Primary = {
  args: {
    children: 'This is header text',
  },
};
