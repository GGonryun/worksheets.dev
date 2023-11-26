import type { Meta } from '@storybook/react';
import { GameScreen } from '.';
import {
  SampleGameLauncher,
  SampleGameDescription,
  sampleMixedGridItems,
} from '../../_samples';

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
