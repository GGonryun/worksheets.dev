import type { Meta } from '@storybook/react';
import { GameSection } from './game-section';
import { GameIcon } from './game-icon';

const Story: Meta<typeof GameSection> = {
  component: GameSection,
  title: 'Games/GameSection',
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          height: 'auto',
          padding: '20px 0',
          backgroundColor: 'rgb(250, 203, 202)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    title: 'Popular This Week',
    children: (
      <>
        <GameIcon name="solitaire" banner="hot" />
        <GameIcon name="solitaire" banner="new" />
        <GameIcon name="solitaire" />
        <GameIcon name="solitaire" banner="new" />
        <GameIcon name="solitaire" banner="played" />
        <GameIcon name="solitaire" />
        <GameIcon name="solitaire" />
        <GameIcon name="solitaire" banner="new" />
        <GameIcon name="solitaire" />
        <GameIcon name="solitaire" banner="played" />
      </>
    ),
  },
};
