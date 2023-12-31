import type { Meta } from '@storybook/react';
import { GameSubmissionScreen } from './game-submission-screen';

const Story: Meta<typeof GameSubmissionScreen> = {
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
  ],
};
export default Story;

export const Primary = {
  args: {
    invalidProfile: false,
    formErrors: {},
  },
};

export const InvalidProfile = {
  args: {
    invalidProfile: true,
    formErrors: {},
  },
};
