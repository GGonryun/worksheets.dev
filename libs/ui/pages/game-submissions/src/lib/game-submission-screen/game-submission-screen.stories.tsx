import type { Meta } from '@storybook/react';
import { GameSubmissionScreen } from './game-submission-screen';
import {
  DEFAULT_VALUES,
  GameSubmissionFormContextProvider,
} from '../form-context';
import { action } from '@storybook/addon-actions';

type Story = Meta<typeof GameSubmissionScreen>;

const Default: Story = {
  component: GameSubmissionScreen,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
        }}
      >
        <Story />
      </div>
    ),
    (Story) => (
      <GameSubmissionFormContextProvider value={DEFAULT_VALUES(action)}>
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};
export default Default;

export const Primary = {
  args: {
    invalidProfile: false,
  },
};

export const InvalidProfile = {
  args: {
    invalidProfile: true,
  },
};
