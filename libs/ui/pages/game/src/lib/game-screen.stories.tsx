import type { Meta } from '@storybook/react';
import { sampleMixedGridItems } from '@worksheets/ui/mocks';
import { GameScreen } from './game-screen';
import { SampleGameLauncher, SampleGameDescription } from './mocks';

const Story: Meta<typeof GameScreen> = {
  component: GameScreen,
  title: 'Content/GameScreen',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightgrey',
          padding: '10px',
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
    game: <SampleGameLauncher />,
    description: <SampleGameDescription />,
    suggestions: sampleMixedGridItems(),
  },
};
