import type { Meta } from '@storybook/react';
import { GameScreen } from '.';
import { SampleGameDescription, sampleMixedGridItems } from '../../util';

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
    description: <SampleGameDescription />,
    suggestions: sampleMixedGridItems(),
    categories: [],
  },
};
